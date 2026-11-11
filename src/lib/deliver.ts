import "server-only";
import { getFormDelivery } from "@/lib/env";
import { interestLabels, type EnquiryInput } from "@/lib/validation";
import { site } from "@/config/site";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Deliver a contact or get-involved message. Returns ok only when the provider accepted it. */
export async function deliverEnquiry(input: EnquiryInput): Promise<DeliveryResult> {
  const d = getFormDelivery();
  if (d.mode === "none") return { ok: false, reason: "not-configured" };

  const kindLabel = input.kind === "involvement" ? "Get involved" : "Contact";
  const interest = input.interest ? interestLabels[input.interest] : "";
  const subject = `${site.shortName} website · ${kindLabel}${interest ? ` (${interest})` : ""}${input.subject ? `: ${input.subject}` : ""} · ${input.name}`;
  const lines = [
    ["Form", kindLabel],
    ["Name", input.name],
    ["Email", input.email],
    ...(interest ? [["Interest", interest]] : []),
    ...(input.subject ? [["Subject", input.subject]] : []),
    ["Message", input.message],
  ] as [string, string][];

  try {
    if (d.mode === "resend") {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${d.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: d.from,
          to: [d.to],
          reply_to: input.email,
          subject,
          text: lines.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
          html: lines.map(([k, v]) => `<p><strong>${esc(k)}:</strong><br>${esc(v).replace(/\n/g, "<br>")}</p>`).join(""),
        }),
        signal: AbortSignal.timeout(15000),
      });
      return res.ok ? { ok: true } : { ok: false, reason: "failed" };
    }

    const res = await fetch(d.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, _replyto: input.email, ...Object.fromEntries(lines) }),
      signal: AbortSignal.timeout(15000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
