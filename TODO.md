# SnugBug Website — Infrastructure TODO

**Last updated:** 2026-04-05

---

## 1. Database (Railway Postgres)

- [ ] Add PostgreSQL plugin to Railway project `outstanding-connection`
      → Railway Dashboard > "+ New" > "Database" > "PostgreSQL"
- [ ] Copy the `DATABASE_URL` connection string from Railway Postgres service variables
- [ ] Add `DATABASE_URL` to Vercel env vars:
      ```
      vercel env add DATABASE_URL production
      ```
- [ ] Redeploy on Vercel so the new env var takes effect
- [ ] Verify: submit an email on the waitlist form and confirm it persists

> Tables (`waitlist`, `comments`) auto-create on first query — no migrations needed.

---

## 2. Analytics (PostHog)

- [ ] Create a PostHog account/project at https://posthog.com
- [ ] Copy the Project API Key from Settings > Project > API Key
- [ ] Add to Vercel:
      ```
      vercel env add NEXT_PUBLIC_POSTHOG_KEY production
      ```
- [ ] (Optional) Set `NEXT_PUBLIC_POSTHOG_HOST` if using EU cloud (`https://eu.i.posthog.com`)
- [ ] Redeploy and verify events appear in PostHog dashboard
- [ ] Wire up unused tracking helpers (`trackSectionView`, `trackCTAClick` in `src/lib/analytics.ts`)

---

## 3. Payments (Stripe)

- [ ] Create a Stripe account (or use existing) at https://dashboard.stripe.com
- [ ] Create a Product for SnugBug (e.g. "SnugBug Nasal Insert — Pre-order")
- [ ] Create a Price on that product (one-time, set amount)
- [ ] Copy `STRIPE_SECRET_KEY` (from API Keys) and the `price_xxx` ID
- [ ] Add to Vercel:
      ```
      vercel env add STRIPE_SECRET_KEY production
      vercel env add STRIPE_DEFAULT_PRICE_ID production
      ```
- [ ] Add `NEXT_PUBLIC_SITE_URL` (for checkout redirect URLs):
      ```
      vercel env add NEXT_PUBLIC_SITE_URL production
      # value: https://getsnugbug.com
      ```
- [ ] Wire a "Pre-order" / "Buy Now" button in the UI that calls `POST /api/checkout`
- [ ] Build a `/success` page for post-checkout (currently missing — checkout redirects there)
- [ ] Test full checkout flow with Stripe test keys

---

## 4. Email

- [ ] Set up Google Workspace (or Zoho/Fastmail) for `hello@getsnugbug.com`
- [ ] Add MX records to `getsnugbug.com` in Vercel DNS settings
- [ ] (Optional) Set up Resend or ConvertKit for transactional/drip emails
- [ ] (Optional) Add welcome email on waitlist signup

---

## 5. Content Placeholders to Replace

- [ ] Founder photo in FounderStory section (currently a gray placeholder box)
- [ ] Press logos in TrustSignals (5x "Press Logo N" placeholders)
- [ ] Parent testimonials in TrustSignals (placeholder quotes)
- [ ] Social links in CTAFooter — Instagram, Facebook, TikTok all point to `"#"`

---

## 6. Missing Pages

Footer nav links reference pages that don't exist yet:

- [ ] `/about`
- [ ] `/product`
- [ ] `/faq` (full version — FAQPreview on homepage has 4 items)
- [ ] `/contact`
- [ ] `/blog`

---

## 7. Automation (n8n)

- [ ] Configure Slack Bot credential in n8n
- [ ] Deploy the waitlist → Slack notification workflow
- [ ] Update `/api/waitlist` to POST to n8n webhook after successful signup
- [ ] (Optional) Add more workflows: daily signup digest, Stripe payment alerts

---

## 8. Polish & Hardening

- [ ] Run Lighthouse audit, fix performance/accessibility issues
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Add Open Graph / Twitter meta images for social sharing
- [ ] Verify all 3 domains (getsnugbug.com, getsnugbugs.com, snugbug.mom) resolve correctly with HTTPS
- [ ] Set canonical URL to `getsnugbug.com`, redirect others
- [ ] Add error boundary / custom 404 page
- [ ] Set up uptime monitoring (e.g. BetterStack, Railway healthcheck)

---

## Quick Reference

| Service | Dashboard |
|---------|-----------|
| Vercel | https://vercel.com/skelligs909s-projects/snugbug-website |
| Railway | https://railway.com/project/1a47805b-3bc0-4a4e-a74a-928719895fea |
| GitHub | https://github.com/skelligs909/snugbug-website |
| Live site | https://getsnugbug.com |
