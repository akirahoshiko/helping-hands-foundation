import "server-only";
import { getFormDelivery } from "@/lib/env";
import { interestLabels, type EnquiryInput } from "@/lib/validation";
import { site } from "@/config/site";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Send one message through the configured provider. ok only when the provider accepted it. */
async function deliver(subject: string, lines: [string, string][], replyTo: string): Promise<DeliveryResult> {
  const d = getFormDelivery();
  if (d.mode === "none") return { ok: false, reason: "not-configured" };
  try {
    if (d.mode === "resend") {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${d.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: d.from,
          to: [d.to],
          reply_to: replyTo,
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
      body: JSON.stringify({ _subject: subject, _replyto: replyTo, ...Object.fromEntries(lines) }),
      signal: AbortSignal.timeout(15000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

/** Contact and Get Involved messages */
export function deliverEnquiry(input: EnquiryInput) {
  const kindLabel = input.kind === "involvement" ? "Get involved" : "Contact";
  const interest = input.interest ? interestLabels[input.interest] : "";
  const subject = `${site.shortName} website · ${kindLabel}${interest ? ` (${interest})` : ""}${input.subject ? `: ${input.subject}` : ""} · ${input.name}`;
  const lines: [string, string][] = [
    ["Form", kindLabel],
    ["Name", input.name],
    ["Email", input.email],
    ...(interest ? ([["Interest", interest]] as [string, string][]) : []),
    ...(input.subject ? ([["Subject", input.subject]] as [string, string][]) : []),
    ["Message", input.message],
  ];
  return deliver(subject, lines, input.email);
}

/** Newsletter sign-ups */
export function deliverNewsletter(email: string) {
  return deliver(`${site.shortName} website · Newsletter sign-up · ${email}`, [["Form", "Newsletter sign-up"], ["Email", email]], email);
}
