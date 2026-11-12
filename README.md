# Helping Hands Foundation website

The website for **Helping Hands Foundation**, a Lagos foundation that looks after orphans and vulnerable children and helps families pay for medical treatment they can't afford.

Live at **https://helping-hands-foundation.peaceomachunyiejiga.workers.dev**

Built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS 4**, hosted on **Cloudflare Workers**. Donations in **US dollars** through **Paystack**; contact, volunteer and newsletter forms delivered by **Resend** or **Formspree**.

Designed and built by Peace Ejiga.

---

## Design approach

Before designing, 23 NGO websites were reviewed (charity: water, GiveDirectly, UNICEF, Save the Children, WaterAid, Malala Fund, Room to Read, Pencils of Promise, SOS Children's Villages, Partners In Health, MSF, World Vision, CARE, Plan International, Mercy Corps, Compassion, Action Against Hunger, ONE, Lagos Food Bank, Slum2School, Habitat for Humanity, Oxfam, Amref).

Patterns used on this site: a donation box in the hero, an impact-number band, campaign progress bars, a "what your gift can do" calculator, a where-the-money-goes chart, news cards, an appeal bar above the header and a footer newsletter. The policies draw on GiveDirectly's donor privacy policy, the Nigeria Data Protection Act 2023, the Donor Bill of Rights and Bond safeguarding guidance.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: fill in keys (see below)
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run preview` | Run the site locally in the Cloudflare Workers runtime |
| `npm run deploy` | Build and deploy to Cloudflare |

The site works without any environment variables. Until a Paystack key is added, the donation form explains that card payments aren't available yet and points visitors to the contact page. Nothing is ever charged without a key.

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: photo hero with quick-donate box, impact numbers, causes with campaign progress, gift calculator, spending chart, news, team, ways to get involved |
| `/about` | Story, mission, timeline, values, approach and team |
| `/causes` and `/causes/[orphan-care, children-education, medical-support]` | Overview and a page per cause: the need, the support, ways to help |
| `/donate` | Donation form: one-off or monthly, suggested or custom amount, choice of cause, review step |
| `/donate/complete` | Paystack return page: verifies the payment on the server before thanking the donor |
| `/get-involved` | Volunteering, partnerships, in-kind gifts and an interest form |
| `/transparency`, `/transparency/annual-report-2025` | Spending breakdown, commitments, reports and the 2025 financial summary |
| `/news`, `/news/[slug]` | News and programme updates |
| `/safeguarding` | Safeguarding commitments, code of conduct, how to report a concern |
| `/contact` | Contact form and contact details |
| `/privacy`, `/donation-policy` | Privacy policy (NDPA-aligned) and donation policy |
| `/photo-credits` | Credits for stock photography |

---

## Where content lives

| File | Contents |
| --- | --- |
| `src/config/site.ts` | **Organisation details**: contact info, social links, registration, history, timeline, team, impact figures, spending, appeal and reports. Empty values are hidden on the site. |
| `src/content/causes.ts` | The three causes, their campaigns and the donation designations |
| `src/content/stories.ts` | News and programme updates |
| `src/content/photos.ts` | Photo library with alt text and Unsplash IDs (images in `src/assets/photos`) |
| `src/lib/validation.ts` | Suggested amounts, minimum and maximum gift, currency and form rules (shared by browser and server) |

Colours and fonts: `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` (Bricolage Grotesque for headings, DM Sans for body text).

---

## Payments (Paystack, USD)

### Why Paystack

The foundation is based in **Nigeria** and takes donations in **USD**:

- **Stripe** does not open accounts for businesses registered in Nigeria.
- **Paystack** supports Nigerian businesses accepting **USD**, once international payments and **USD settlement** are approved, with payouts to a **USD domiciliary account**. Paystack subscription plans support USD for accounts with USD enabled.
- **Flutterwave**'s documentation was unclear about USD payouts to Nigerian domiciliary accounts, so it was not chosen.

The payment code is isolated in `src/lib/payments/`, so another provider can be added later.

### How it works

1. The browser sends the donation details to `POST /api/donations`.
2. The server re-validates everything with zod, then calls Paystack **with the secret key** to create the transaction (amount in cents, `currency: USD`, metadata with cause, frequency and name). Monthly gifts reuse or create a monthly USD **plan** for that amount.
3. The donor is sent to **Paystack's hosted checkout**. Card details are never entered on this website.
4. Paystack returns the donor to `/donate/complete?reference=…`. The page **verifies the transaction on the server** and shows "thank you" **only** if Paystack reports `success` in USD. The redirect alone is never trusted.
5. `POST /api/webhooks/paystack` receives Paystack events. It rejects any request whose `x-paystack-signature` (HMAC-SHA512 of the raw body) doesn't match, ignores repeated deliveries, and re-verifies `charge.success` before recording it.

Other safeguards:

- **Secrets stay on the server.** Secret keys exist only in `src/lib/env.ts` and API routes.
- **Live keys are refused** unless `PAYMENTS_ALLOW_LIVE=true`.
- **Monthly giving is hidden** unless `PAYSTACK_RECURRING_ENABLED=true`.
- **Same-origin check and rate limiting** protect the donation and form endpoints.
- **Cancelling** at checkout returns the donor to `/donate?status=cancelled` with a "no money was taken" message.

### Switching payments on

1. Complete Paystack business verification.
2. Request **international payments** and **USD settlement**, and add the **USD domiciliary account**.
3. Add the **test** secret key (`sk_test_…`) as `PAYSTACK_SECRET_KEY` and set `NEXT_PUBLIC_SITE_URL`.
4. In Paystack → Settings → API Keys & Webhooks, set the webhook URL to `https://<your-domain>/api/webhooks/paystack`.
5. Test successful, cancelled and failed payments with Paystack's test cards.
6. If Paystack confirms USD subscriptions, set `PAYSTACK_RECURRING_ENABLED=true` and test a monthly gift.
7. Switch to the **live** key and set `PAYMENTS_ALLOW_LIVE=true`.
8. Optional: replace `recordDonation()` in `src/app/api/webhooks/paystack/route.ts` with a database or a notification email, keyed on the transaction reference.

---

## Forms

`POST /api/enquiries` and `POST /api/newsletter` validate on the server and reply `ok` **only when the message was actually delivered**.

- **Resend:** set `RESEND_API_KEY`, `FORMS_TO_EMAIL` and `FORMS_FROM_EMAIL`. The sending domain must be verified in Resend.
- **Formspree:** set `FORMSPREE_ENDPOINT=https://formspree.io/f/<id>`. A default endpoint is set in `site.forms.formspreeFallback`.

Spam protection: a hidden honeypot field, a minimum time-to-submit check, a same-origin check and per-IP rate limiting.

Privacy: the forms collect only name, email, interest or subject and message, and ask visitors not to send medical or sensitive information.

---

## Environment variables

See [`.env.example`](.env.example).

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public URL of the site |
| `PAYSTACK_SECRET_KEY` | For payments | `sk_test_…` during testing |
| `PAYMENTS_ALLOW_LIVE` | For live payments | `true` only after approval |
| `PAYSTACK_RECURRING_ENABLED` | For monthly giving | `true` only once USD plans are confirmed |
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | For form delivery | Option A |
| `FORMSPREE_ENDPOINT` | For form delivery | Option B |

---

## Deployment

Hosted on **Cloudflare Workers** using the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare) (`wrangler.jsonc`, `open-next.config.ts`). Every push to `main` deploys automatically.

| Setting | Value |
| --- | --- |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Root directory | `/` |

Environment variables go under the Worker → **Settings → Variables and Secrets**. Store `PAYSTACK_SECRET_KEY` and `RESEND_API_KEY` as **secrets**.

Notes:
- **Cache Components is turned off** in `next.config.ts`: it relies on `setTimeout` behaviour the Workers runtime does not provide, and requests hang. Request-time pages use `connection()` instead.
- Photos are pre-compressed in `src/assets` and served as static files (`images.unoptimized`), so no image-resizing service is needed.
- OpenNext warns that Windows is not fully supported for builds; Cloudflare's build servers run Linux, so automatic deploys are unaffected.
- The site also runs on any Node.js host (`npm run build && npm start`).

---

## Accessibility and quality

- Semantic landmarks, a skip link, descriptive page titles, labelled form controls with linked error messages, visible focus styles and keyboard-operable menus.
- Colour contrast meets WCAG AA.
- Animations are subtle and switched off for visitors who prefer reduced motion. Content stays visible without JavaScript.
- Responsive images with blur placeholders.
- Tested across 18 page types on phone, tablet and desktop.
