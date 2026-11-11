import { deliverNewsletter } from "@/lib/deliver";
import { clientIp, rateLimited, sameOrigin } from "@/lib/guard";
import { fieldErrors, newsletterSchema } from "@/lib/validation";

/** Newsletter sign-up. { ok: true } only when the sign-up was actually delivered. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false, error: "forbidden" }, { status: 403 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return Response.json({ ok: false, error: "invalid", fields: fieldErrors(parsed.error) }, { status: 422 });
  const { email, website, startedAt } = parsed.data;
  if (website || (startedAt && Date.now() - startedAt < 1500)) {
    return Response.json({ ok: false, error: "rejected", message: "Your sign-up could not be accepted. Please try again." }, { status: 400 });
  }
  if (rateLimited(`newsletter:${clientIp(req)}`, 5)) {
    return Response.json({ ok: false, error: "rate-limited", message: "Too many attempts. Please try again later." }, { status: 429 });
  }
  const result = await deliverNewsletter(email);
  if (result.ok) return Response.json({ ok: true });
  return Response.json(
    { ok: false, error: result.reason, message: result.reason === "not-configured" ? "Sign-ups are not switched on yet, so you were not subscribed." : "We couldn’t subscribe you just now. Please try again." },
    { status: result.reason === "not-configured" ? 503 : 502 },
  );
}
