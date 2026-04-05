# SnugBug Website - Handover Document

**Date:** April 5, 2026
**Project:** snugbug-website
**Status:** MVP deployed, integrations wired, awaiting env vars for full functionality

---

## 1. What We Built

A single-page marketing website for SnugBug, a children's nasal insert product. The site is live and auto-deploys on every push to `main`.

### Live URLs

| URL | Status |
|-----|--------|
| https://snugbug-website.vercel.app | Live (Vercel default) |
| https://getsnugbug.com | Connected |
| https://getsnugbugs.com | Connected |
| https://snugbug.mom | Connected |

### Repository

| Item | Value |
|------|-------|
| GitHub | https://github.com/skelligs909/snugbug-website |
| Vercel Project | https://vercel.com/skelligs909s-projects/snugbug-website |
| Vercel Team ID | `team_FIZyf02JpC46Q6axityBd9ZT` |
| Vercel Project ID | `prj_GjYrfoR49iIS4V3wKAIZ14j0uzib` |

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.2 |
| UI | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS v4 | 4.x |
| Animation | Framer Motion | 12.38.0 |
| Database | PostgreSQL via `pg` | 8.20.0 |
| Payments | Stripe | 22.0.0 |
| Analytics | PostHog | 1.364.7 |
| Hosting | Vercel | Auto-deploy on push |

---

## 3. Homepage Sections (in order)

| # | Section | Component | Description |
|---|---------|-----------|-------------|
| 1 | **Hero** | `Hero.tsx` | Animated ladybug mascot, headline "Big relief for little noses", email waitlist capture, parallax background blobs |
| 2 | **Problem/Solution** | `ProblemSolution.tsx` | Split layout: "It's 2am. Your child has a nosebleed." vs SnugBug as the answer |
| 3 | **How It Works** | `HowItWorks.tsx` | 3-step animated sequence with ladybug guide: Open, Insert, Breathe |
| 4 | **Product Features** | `ProductFeatures.tsx` | Bento grid: Natural Cotton, Gentle Fit, Stops Nosebleeds, Eases Congestion, Sterile Packaging, Child-Sized |
| 5 | **Trust Signals** | `TrustSignals.tsx` | 3 parent testimonials, press logo placeholders, trust badges |
| 6 | **Founder Story** | `FounderStory.tsx` | Personal narrative, founder photo placeholder, blockquote |
| 7 | **FAQ Preview** | `FAQPreview.tsx` | 4-item accordion (safety, ages, duration, prescription) |
| 8 | **Co-Founder Comments** | `CoFounderComments.tsx` | Internal feedback tool: section-based tabs, comment form, persists to Postgres |
| 9 | **CTA / Footer** | `CTAFooter.tsx` | Final email capture, nav links, social icons, copyright |

---

## 4. Project Structure

```
snugbug-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout: fonts, PostHog provider, metadata
│   │   ├─��� page.tsx             # Homepage: composes all 9 sections
│   │   ├── globals.css          # Tailwind v4 @theme tokens, base styles
│   │   ├── actions.ts           # Server Actions: submitComment, fetchComments
│   │   └── api/
│   │       ├── checkout/route.ts  # POST - Stripe checkout session
│   │       └── waitlist/route.ts  # POST - Save email to Postgres
│   ├── components/
│   │   ├── Ladybug.tsx          # Animated SVG mascot (float, antenna wiggle, shimmer)
│   ���   ├── PostHogProvider.tsx  # Client-side analytics wrapper
│   │   ├── ui/
│   │   │   ├── Button.tsx       # CTA button (primary/secondary/ghost, sm/md/lg)
│   │   │   ├── Container.tsx    # Max-width wrapper (server component)
│   │   │   └─�� Section.tsx      # Scroll-triggered fade-in wrapper
│   │   └── sections/            # All 9 homepage sections (see table above)
│   └── lib/
│       ├── db.ts                # PostgreSQL connection pool + query helpers
│       ├── stripe.ts            # Lazy Stripe client initialization
│       └── analytics.ts         # PostHog event helpers
├── public/brand/                # 8 SVG brand assets from brand kit
├── .vercel/project.json         # Vercel project linkage
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

---

## 5. Design System

### Colors (Tailwind theme tokens)

| Token | Hex | CSS Class | Usage |
|-------|-----|-----------|-------|
| `snugbug-red` | `#E03E36` | `bg-snugbug-red`, `text-snugbug-red` | CTAs, hearts, accents, "Bug" text |
| `snugbug-green` | `#6B8E6B` | `bg-snugbug-green`, `text-snugbug-green` | Trust signals, nature |
| `snugbug-cream` | `#F5F0E8` | `bg-snugbug-cream` | Page background, warm sections |
| `snugbug-sky` | `#B8D4E8` | `bg-snugbug-sky` | Packaging accents, soft highlights |
| `snugbug-dark` | `#2D2D2D` | `text-snugbug-dark` | Body text, headings |
| `snugbug-gray` | `#666666` | `text-snugbug-gray` | Secondary text, captions |

### Typography

| Token | Font | CSS Class | Usage |
|-------|------|-----------|-------|
| `--font-heading` | Fraunces Variable | `font-heading` | Headings, display text |
| `--font-body` | DM Sans Variable | `font-body` | Body copy, paragraphs |
| `--font-accent` | Nunito | `font-accent` | Buttons, callouts |

### Utility Classes

- `.cotton-texture` — SVG fractal noise overlay for tactile warmth
- `.blob-bg-1`, `.blob-bg-2`, `.blob-bg-red` — Organic gradient backgrounds

---

## 6. Integrations

### 6a. Waitlist Email Capture

- **Endpoint:** `POST /api/waitlist`
- **Input:** `{ "email": "user@example.com" }`
- **Storage:** PostgreSQL `waitlist` table (auto-created, UNIQUE on email)
- **Analytics:** Fires `waitlist_signup` PostHog event + identifies user
- **Used in:** Hero section, CTAFooter section
- **Status:** Code complete. Needs `DATABASE_URL` env var to persist.

### 6b. Stripe Checkout

- **Endpoint:** `POST /api/checkout`
- **Input:** `{ "priceId": "price_xxx", "email": "user@example.com" }`
- **Output:** `{ "url": "https://checkout.stripe.com/..." }`
- **Config:** Lazy initialization — won't crash without API key
- **Status:** API route ready. No UI button wired yet. Needs `STRIPE_SECRET_KEY` and `STRIPE_DEFAULT_PRICE_ID`.

### 6c. PostHog Analytics

- **Provider:** Wraps entire app in `layout.tsx`
- **Auto-capture:** Pageviews, page leaves
- **Custom events:** `waitlist_signup`, `section_viewed`, `cta_clicked`
- **Helper functions:** `src/lib/analytics.ts`
- **Status:** Code complete. Needs `NEXT_PUBLIC_POSTHOG_KEY` to activate.

### 6d. Co-Founder Comments

- **Component:** `CoFounderComments.tsx`
- **Server Actions:** `submitComment()`, `fetchComments()` in `src/app/actions.ts`
- **Database:** PostgreSQL `comments` table (auto-created)
- **Features:** Section-based filtering tabs, author name saved in localStorage, animated comment list with relative timestamps
- **Status:** Code complete. Needs `DATABASE_URL` env var to persist.

### 6e. n8n Workflow (Waitlist -> Slack)

- **Workflow:** Validated but not deployed (needs Slack credential in n8n)
- **Trigger:** Webhook at `/snugbug-waitlist`
- **Action:** Posts "New SnugBug waitlist signup: {email}" to Slack channel
- **Status:** Code ready, needs n8n Slack Bot credential configured.

---

## 7. Environment Variables Needed

Set these in **Vercel Dashboard** > Settings > Environment Variables:

| Variable | Required | Where to get it |
|----------|----------|----------------|
| `DATABASE_URL` | Yes | Railway Postgres connection string |
| `STRIPE_SECRET_KEY` | Yes | Stripe Dashboard > API Keys |
| `STRIPE_DEFAULT_PRICE_ID` | Yes | Stripe > Products > Price ID |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://getsnugbug.com` |
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes | PostHog > Project Settings > API Key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | `https://us.i.posthog.com` (default) |

---

## 8. Git History

| Commit | Description |
|--------|-------------|
| `fc3ad06` | Switch from Vercel Postgres to standard pg for Railway compatibility |
| `9fc49f7` | Integrate PostHog analytics, Stripe checkout, and waitlist API |
| `b0b3174` | Add co-founder comments section with Vercel Postgres |
| `cef007e` | Build SnugBug MVP homepage with all 8 sections |
| `7810c0d` | Initial Next.js 15 scaffold with Tailwind CSS and TypeScript |
| `ce41099` | Initial commit from Create Next App |

---

## 9. Brand Assets

8 SVG files in `public/brand/`:

| File | Purpose |
|------|---------|
| `snugbug_logo_primary.svg` | Main horizontal logo (ladybug + "SnugBug" + tagline) |
| `snugbug_logo_stacked.svg` | Vertical layout for narrow spaces |
| `snugbug_logo_monochrome.svg` | Black/white version for dark backgrounds |
| `snugbug_icon_ladybug.svg` | Standalone ladybug in sky blue circle |
| `snugbug_badge_marketing_seal.svg` | Circular badge/seal for packaging |
| `snugbug_wordmark_marketing.svg` | Text wordmark with cloud elements |
| `snugbug_brand_sheet.svg` | Full brand reference sheet |
| `snugbug_cotton_insert_symbol.svg` | Product illustration with description |

**Note:** SVG brand assets use slightly different colors (#E84C3D) than the website (#E03E36). The website uses the brief's color spec.

---

## 10. Domains

| Domain | Status | Expires |
|--------|--------|---------|
| getsnugbug.com | Connected to Vercel project | Apr 5, 2027 |
| getsnugbugs.com | Connected to Vercel project | Apr 5, 2027 |
| snugbug.mom | Connected to Vercel project | Apr 5, 2027 |
| snugbug-website.vercel.app | Default Vercel subdomain | N/A |

All domains registered via Vercel with Vercel nameservers.

---

## 11. Recommended Tool Stack

| Tool | Purpose | Status |
|------|---------|--------|
| Google Workspace | Email (hello@getsnugbug.com) | Not set up yet |
| Slack | Team comms | Not set up yet |
| Notion | Docs, wiki, project mgmt | Not set up yet |
| Stripe | Payments | Code integrated, needs API keys |
| PostHog | Analytics | Code integrated, needs API key |
| Railway | PostgreSQL hosting | Not provisioned yet |
| n8n | Workflow automation | Workflow validated, needs Slack credential |

---

## 12. What Works Right Now

- Homepage renders with all 9 sections, animations, and responsive design
- Auto-deploys on push to `main` via Vercel
- All 3 custom domains connected and resolving
- Email capture forms submit (gracefully fail without DB)
- Co-founder comments UI renders (gracefully fails without DB)
- Ladybug mascot animates (float, antenna wiggle, wing shimmer)
- Scroll-triggered section reveals throughout

---

## 13. What Needs Setup to Be Fully Functional

| Priority | Task | Effort |
|----------|------|--------|
| **P0** | Create Railway Postgres DB, add `DATABASE_URL` to Vercel | 5 min |
| **P0** | Create PostHog project, add `NEXT_PUBLIC_POSTHOG_KEY` to Vercel | 5 min |
| **P0** | Add Stripe API keys to Vercel | 5 min |
| **P1** | Set up Google Workspace for hello@getsnugbug.com (add MX records) | 30 min |
| **P1** | Create Stripe product + price for SnugBug | 10 min |
| **P1** | Wire Stripe checkout button into the UI | 30 min |
| **P2** | Build inner pages: /about, /product, /faq, /contact, /blog | Hours |
| **P2** | Replace placeholder testimonials and press logos | 30 min |
| **P2** | Add founder photo to FounderStory section | 5 min |
| **P2** | Set up n8n Slack credential and deploy waitlist notification workflow | 15 min |
| **P3** | Add email welcome sequence (Resend/ConvertKit) | 1-2 hrs |
| **P3** | Lighthouse audit and performance optimization | 1 hr |
| **P3** | Add Jest/Vitest test configuration | 1 hr |

---

## 14. How to Develop Locally

```bash
# Clone
git clone https://github.com/skelligs909/snugbug-website.git
cd snugbug-website

# Install
npm install

# Create .env.local with required vars
cat > .env.local << 'EOF'
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_DEFAULT_PRICE_ID=price_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
EOF

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy
git push origin main  # Auto-deploys via Vercel
```

---

## 15. Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Standard `pg` over `@vercel/postgres` | Vendor-agnostic — works with Railway, Neon, Supabase, self-hosted |
| Lazy Stripe init (`getStripe()`) | Prevents build failure when `STRIPE_SECRET_KEY` isn't set |
| Server Actions for comments | Simpler than API routes for form submissions, built-in revalidation |
| API routes for waitlist/checkout | Better for external webhook integration (n8n, Zapier) |
| `localStorage` for comment author | Avoids auth complexity for internal co-founder tool |
| Tailwind v4 `@theme` tokens | Single source of truth for brand colors, no separate config file |

---

*End of Handover Document*
