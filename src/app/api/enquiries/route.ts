import { deliverEnquiry } from "@/lib/deliver";
import { clientIp, rateLimited, sameOrigin } from "@/lib/guard";
import { enquirySchema, fieldErrors } from "@/lib/validation";

/** Contact and Get Involved messages. Responds { ok: true } ONLY when the message was actually delivered. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false, error: "forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid", message: "We couldn't read that submission. Please try again." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid", fields: fieldErrors(parsed.error) }, { status: 422 });
  }
  const input = parsed.data;

  // Spam trap filled, or submitted faster than a person could type: quietly drop, never deliver.
  const tooFast = input.startedAt && Date.now() - input.startedAt < 2500;
  if (input.website || tooFast) {
    return Response.json({ ok: false, error: "rejected", message: "Your message could not be accepted. Please try again in a moment." }, { status: 400 });
  }

  if (rateLimited(`enquiry:${clientIp(req)}`)) {
    return Response.json({ ok: false, error: "rate-limited", message: "You've sent several messages in a short time. Please wait a few minutes and try again." }, { status: 429 });
  }

  const result = await deliverEnquiry(input);
  if (result.ok) return Response.json({ ok: true });
  if (result.reason === "not-configured") {
    return Response.json(
      { ok: false, error: "not-configured", message: "Online messages are not switched on yet, so your message was not sent. Please try again later." },
      { status: 503 },
    );
  }
  return Response.json({ ok: false, error: "failed", message: "Your message could not be delivered just now. Please try again in a few minutes." }, { status: 502 });
}
