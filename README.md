# Helping Hands Foundation website

The website for **Helping Hands Foundation**, a new foundation supporting orphans, vulnerable children in Africa, and people who need financial help with medical treatment.

Built with **Next.js 16 (App Router, Cache Components)**, **TypeScript** and **Tailwind CSS 4**. Donations in **US dollars** through **Paystack**; contact and volunteer forms delivered by **Resend** or **Formspree**.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: fill in keys (see below)
npm run dev                  # http://localhost:3000
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

With no environment variables set, the whole site works and the donation and contact forms run in an honest **demo state**: visitors can explore them, but nothing is charged or sent, and the site says so clearly.

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, purpose, three causes, how giving works, accountability, volunteer and partner invitations |
| `/about` | Mission, vision, values, approach; team, history and registration appear once supplied |
| `/causes` and `/causes/[orphan-care, children-education, medical-support]` | Overview and a detail page per cause: the need, intended support, ways to help |
| `/donate` | Donation form: one-time or monthly, $10 / $25 / $50 / $100 or custom, choice of cause, review step |
| `/donate/complete` | Paystack return page: verifies the payment server-side before thanking the donor |
| `/get-involved` | Volunteer, corporate partnership, in-kind contributions, interest form |
| `/transparency` | Accountability commitments; reports and registration with honest empty states |
| `/contact` | Contact form; contact details and social links appear only when supplied |
| `/privacy`, `/donation-policy` | Draft policies matching the site's real behaviour, with items to confirm highlighted |
| `/photo-credits` | Source of every illustrative photograph |

---

## Where content lives

| File | Contents |
| --- | --- |
| `src/config/site.ts` | **Organisation details**: contact info, social links, registration, history, team, published reports. Empty values are hidden on the site. |
| `src/content/causes.ts` | Copy for the three causes and the donation designations |
| `src/content/photos.ts` | Photo library with alt text and Unsplash IDs (images in `src/assets/photos`) |
| `src/lib/validation.ts` | Suggested amounts, min/max gift, currency, and form validation rules (shared by browser and server) |

Brand colours and fonts: `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` (DM Serif Display + Figtree).

---

## Payments (Paystack, USD)

### Why Paystack

The foundation is expected to be registered in **Nigeria**, and donations are in **USD**:

- **Stripe** does not open accounts for businesses registered in Nigeria.
- **Paystack** officially supports Nigerian businesses accepting **USD**. This requires international payments to be enabled and **USD settlement** approved, with payouts to a **USD domiciliary account** (Paystack currently lists Zenith Bank for Nigeria). Paystack subscription plans support USD for businesses with USD enabled.
- **Flutterwave**'s public documentation was contradictory about USD payouts to Nigerian domiciliary accounts, so it was not chosen.

Before going live, the foundation must **confirm with Paystack** that its account is approved for USD collection, USD settlement and (for monthly giving) USD subscription plans. If the foundation is registered in a different country, re-check provider support. The payment code is isolated in `src/lib/payments/` so another provider can be added.

### How it works (security)

1. The browser sends the donation details to `POST /api/donations`.
2. The server re-validates everything with zod, then calls Paystack **with the secret key** to create the transaction (amount in cents, `currency: USD`, metadata with cause, frequency and name). For monthly gifts it reuses or creates a monthly USD **plan** for that amount.
3. The donor is redirected to **Paystack's hosted checkout**. Card details are never entered on this website.
4. Paystack returns the donor to `/donate/complete?reference=…`. The page **verifies the transaction server-side** (`GET /transaction/verify/:reference`) and shows "thank you" **only** if Paystack reports `success` in USD. The redirect alone is never trusted.
5. `POST /api/webhooks/paystack` receives Paystack events. It rejects any request whose `x-paystack-signature` (HMAC-SHA512 of the raw body with the secret key) doesn't match, ignores repeated deliveries, and re-verifies `charge.success` with the API before recording it.

Other safeguards:

- **Secrets stay on the server.** Secret keys exist only in `src/lib/env.ts` and API routes, never in client code.
- **Live keys are refused** unless `PAYMENTS_ALLOW_LIVE=true`.
- **Monthly giving is hidden** unless `PAYSTACK_RECURRING_ENABLED=true`.
- **Same-origin check and rate limiting** protect the donation and form endpoints.
- **Cancelling** at checkout returns the donor to `/donate?status=cancelled` with a "no money was taken" message.

### Activate payments

1. Create a Paystack account for the foundation and complete compliance (business verification).
2. In the Paystack dashboard, request **international payments** and **USD settlement**, and add the **USD domiciliary account**.
3. Copy the **test** secret key (`sk_test_…`) into `PAYSTACK_SECRET_KEY`. Set `NEXT_PUBLIC_SITE_URL` to the site's address.
4. In Paystack → Settings → API Keys & Webhooks, set the webhook URL to `https://<your-domain>/api/webhooks/paystack`.
5. Test with Paystack's test cards: complete, cancel and failed payments.
6. If Paystack confirms USD subscriptions for the account, set `PAYSTACK_RECURRING_ENABLED=true` and test a monthly gift.
7. When the foundation approves going live, switch to the **live** key and set `PAYMENTS_ALLOW_LIVE=true`.
8. Optional: replace `recordDonation()` in `src/app/api/webhooks/paystack/route.ts` with durable storage (a database) or a notification email, keyed on the transaction reference.

---

## Forms (Contact and Get Involved)

`POST /api/enquiries` validates on the server and replies `ok` **only when the message was actually delivered**.

- **Resend:** set `RESEND_API_KEY`, `FORMS_TO_EMAIL` and `FORMS_FROM_EMAIL`. The sending domain must be verified in Resend.
- **Formspree** (alternative): set `FORMSPREE_ENDPOINT=https://formspree.io/f/<id>`.

If neither is set, the forms show a clear "not switched on yet" notice, and submissions return "your message was not sent".

Spam protection: a hidden honeypot field, a minimum time-to-submit check, a same-origin check, and per-IP rate limiting (in memory, best effort).

Privacy: the forms collect only name, email, interest or subject, and message, and warn visitors not to send medical or sensitive information.

---

## Environment variables

See [`.env.example`](.env.example).

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public URL, e.g. `https://helpinghands.org` |
| `PAYSTACK_SECRET_KEY` | For payments | `sk_test_…` during testing |
| `PAYMENTS_ALLOW_LIVE` | For live payments | `true` only after approval |
| `PAYSTACK_RECURRING_ENABLED` | For monthly giving | `true` only once USD plans are confirmed |
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | For form delivery | Option A |
| `FORMSPREE_ENDPOINT` | For form delivery | Option B |

---

## Content still needed before public launch

Nothing below has been invented. Add each item to `src/config/site.ts`, or as noted, once it is verified.

**Organisation**
- [ ] Legal name, country of registration, registering authority, registration number, and tax status (if any)
- [ ] Verified history of the foundation (`history`)
- [ ] Founders, trustees or staff who consent to be listed (`team`)
- [ ] Public contact details: email, phone, WhatsApp, postal address, office hours
- [ ] Social media profile URLs

**Policies:** items highlighted on `/privacy` and `/donation-policy`
- [ ] Data controller and data protection authority
- [ ] Retention periods
- [ ] Refund window and process
- [ ] Whether donors can cover processing fees
- [ ] Policy for redirecting restricted gifts and for administrative costs
- [ ] Tax-deductibility statement
- [ ] Publication date

**Transparency**
- [ ] Annual reports, financial summaries and project updates as approved PDFs in `public/documents/`, listed in `site.reports`

**Photography**
- [ ] Current images are illustrative Unsplash photos and are labelled as such. Replace them with the foundation's own photographs, taken with informed consent, when available (`src/content/photos.ts`).

**Credentials**
- [ ] Paystack account approved for USD (and USD subscriptions for monthly giving), plus test and live keys
- [ ] Resend or Formspree credentials for form delivery
- [ ] Production domain (`NEXT_PUBLIC_SITE_URL`)

---

## Deployment

Designed for **Vercel**: import the repository, add the environment variables above, and deploy. Any Node.js host that runs `next start` also works.

---

## Accessibility and quality

- Semantic landmarks, a skip link, descriptive page titles, labelled form controls with linked error messages, visible focus styles, and keyboard-operable menus.
- Colour contrast follows WCAG AA. Gold text on light backgrounds uses the darker `gold-600`.
- Animations are subtle and disabled for visitors who prefer reduced motion. Content stays visible without JavaScript.
- Images are optimised with `next/image` (responsive sizes, blur placeholders).

---

Template website designed and built by Peace Ejiga.
