# CLAUDE.md — Vebryx

This file is the single source of truth for the Vebryx codebase. Read it
before making changes — it explains not just *what* exists but *why*, so
you don't have to re-derive decisions that are already settled.

> **Next.js version warning:** this project runs Next.js 16 on Turbopack,
> which has real breaking changes from older Next.js versions your training
> data may assume. The one that already bit this codebase once: **`params`
> and `searchParams` in Server Components are Promises** and must be
> awaited (`const { id } = await params`) — accessing `params.id`
> synchronously silently returns `undefined`, which made every dynamic
> detail route 404 until it was caught by actually running the dev server
> (see `app/listings/[id]/page.jsx`, `app/agents/[id]/page.jsx`,
> `app/blogs/[id]/page.jsx` for the correct pattern). See `AGENTS.md` and
> `node_modules/next/dist/docs/` before assuming any Next.js API behaves
> the way it did in Next 13/14.

---

## Project Overview

**Purpose:** Vebryx is a luxury marketplace platform connecting buyers with
verified agents and partners across five high-value asset categories:
luxury properties, private jets, luxury cars, super yachts, and fine
watches. It is a marketing/lead-generation site today — listing display,
agent/partner discovery, and lead capture (contact forms) — not yet a
transactional platform.

**Target audience:**
- **Buyers:** high-net-worth individuals browsing/searching for luxury
  assets across categories, who convert via inquiry forms routed to
  agents.
- **Sellers (Agents):** independent brokers/realtors who list on a monthly
  membership and want qualified leads.
- **Sellers (Partners):** agencies, dealerships, and brands listing at
  volume, who pay a one-time fee for unlimited listings and featured
  placement.
- **Advertisers:** brands wanting placement in front of a verified luxury
  audience, scoped separately from agent/partner listing accounts.

**Core business model:** two-sided marketplace monetized through
membership fees (Agent: £499/mo, Partner: £999 one-time) rather than
transaction commissions. A third revenue line (advertising placements) is
scoped but not yet built out. See `lib/constants.js` → `MEMBERSHIPS`.

**Current state:** every page and section described in this file is
implemented with real (client-side) interactivity — filtering, search,
accordions, forms — but there is **no backend yet**. Forms simulate
submission with a timeout (see `components/shared/ContactForm.jsx`); CRM
signup pages (`/crm/*`) capture interest via the same contact form and are
explicitly labeled "Coming Soon." See **Future Roadmap** below.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | JS only, no TypeScript. All route files use `.jsx`. |
| UI library | React 19 | |
| Styling | Tailwind CSS v4 | CSS-first config — **no `tailwind.config.js`**. All theme tokens live in `app/globals.css` under `@theme inline` + `:root`. |
| Component system | shadcn/ui (`base-nova` style, `@base-ui/react` primitives) | Installed via `npx shadcn@latest`. Primitives live in `components/ui/*.jsx`. This is **not** the classic Radix-based shadcn — check `components/ui/*.jsx` source before assuming an API (e.g. `Accordion` uses `openMultiple`, not `type="single"`; `Sheet` uses `@base-ui/react/dialog` under the hood). |
| Animation | Framer Motion | All shared variants centralized in `lib/animations.js` — never redefine transitions inline. |
| Icons | lucide-react v1.25 | **Brand/logo icons (Twitter, Youtube, Instagram, Linkedin, Facebook, etc.) do not exist in this version** — they were removed upstream. Generic icons stand in (see `components/layout/Footer.jsx` → `SOCIAL_ICONS`). Always verify an icon name exists (`node -e "console.log(!!require('lucide-react').IconName)"`) before importing it. |
| Fonts | `next/font/google`: Fraunces (display/serif) + Plus Jakarta Sans (body/sans) | Loaded in `app/layout.jsx`, exposed as CSS vars `--font-fraunces` / `--font-jakarta`, mapped to Tailwind's `font-display` / `font-sans` in `app/globals.css`. |
| Utilities | `clsx` + `tailwind-merge` via `lib/utils.js` (`cn()`) | Standard shadcn pattern. |

---

## Design System

The entire visual language is derived from a design-language teardown
("Realist" — a warm, editorial real-estate template) that this project was
explicitly instructed to preserve exactly while only changing content and
structure. **Do not introduce a different visual style** — no new colors,
radii, shadows, or motion timings without updating this file and
`app/globals.css` together.

### Color palette (`app/globals.css`, `:root`)

Warm, editorial, "boutique agency" palette — nature-adjacent (olive, clay,
linen) rather than the blue/navy "corporate trust" palette most luxury
sites default to.

| Token | Hex | Tailwind utility | Usage |
|---|---|---|---|
| `--canvas` | `#FAF7F1` | `bg-canvas` | Page background |
| `--canvas-alt` | `#F1ECE2` | `bg-canvas-alt` | Alternating section backgrounds |
| `--surface` | `#FFFFFF` | `bg-surface` | Cards, form panels |
| `--ink` | `#1E1C18` | `text-ink` | Primary text (warm near-black) |
| `--ink-muted` | `#6E6A60` | `text-ink-muted` | Meta text, captions |
| `--on-dark` | `#FAF7F1` | `text-on-dark` | Text on dark/photo backgrounds |
| `--brand-primary` | `#3F4A36` (olive/sage) | `bg-brand-primary` / `text-brand-primary` | Primary buttons, active states, links |
| `--brand-primary-hover` | `#333B2A` | `hover:bg-brand-primary-hover` | Primary button hover |
| `--brand-secondary` | `#B1603A` (terracotta) | `bg-brand-secondary` / `text-brand-secondary` | Status tags, accents, step numbers |
| `--line` | `#E5DFD2` | `border-line` | Card borders, dividers |
| `--status-for-sale` / `-for-rent` / `-sold` / `-success` / `-error` | see `globals.css` | `bg-status-*` | `components/shared/Tag.jsx` |

shadcn's semantic tokens (`--primary`, `--secondary`, `--muted`, `--accent`,
`--destructive`, `--border`, `--ring`, etc.) are mapped 1:1 onto this
palette in the same file, so any `components/ui/*` primitive automatically
matches the brand without extra work. **Dark mode is intentionally not
implemented** — the source design guide explicitly lists dark mode as an
anti-pattern for this brand, so there is no `.dark` block.

### Typography

- **Display/headings:** Fraunces (warm editorial serif) — `font-display`,
  applied automatically to `h1`–`h4` via `app/globals.css` `@layer base`.
- **Body/UI:** Plus Jakarta Sans — `font-sans`, the default body font.
- **Kicker/eyebrow labels:** `.kicker` utility class (uppercase, 12px,
  `tracking-kicker` = 0.12em, `text-brand-primary`) — see
  `components/shared/Kicker.jsx`. Repeats atop nearly every section as the
  mini-header-before-the-header pattern.
- **Buttons:** `.btn-label` utility (uppercase, 13.5px, semibold,
  `tracking-button` = 0.08em).

### Spacing, radius, shadow

- Spacing uses **Tailwind's default scale** (4px increments) — it already
  covers the guide's 8/16/24/32/48/64/96/128px rhythm with no custom
  tokens needed (`p-2` = 8px … `p-32` = 128px).
- Container: `.section-shell` utility = `mx-auto max-w-[1280px] px-6 md:px-10`.
  Use the `<Container>` component (`components/shared/Container.jsx`)
  rather than writing this by hand.
- Card radius: `rounded-card` (1.25rem / 20px). Buttons: `rounded-pill`
  (full pill) — every CTA button is pill-shaped per the design guide.
- Shadows are **minimal at rest** — cards have no resting shadow, only a
  hover shadow (`shadow-hover` = `0 16px 40px rgba(30,28,24,0.10)`).

### Motion

- Easing: `ease-out-expo` (`cubic-bezier(0.16,1,0.3,1)`) for entrances,
  `ease-standard` (`cubic-bezier(0.4,0,0.2,1)`) for hovers — registered as
  Tailwind utilities via `@theme` in `globals.css`, and as JS constants
  `EASE_OUT_EXPO` / `EASE_STANDARD` in `lib/animations.js`.
- All shared variants (`fadeUp`, `fadeIn`, `scaleIn`, `staggerContainer`,
  `cardHover`, `imageZoom`, `buttonHover`, `accordionChevron`) live in
  `lib/animations.js`. **Import them — don't redefine transitions inline.**
- `prefers-reduced-motion` is respected globally (see the `@media` block
  in `app/globals.css` `@layer utilities`) and specifically in the
  testimonials marquee (`hooks/useMarquee.js`).

---

## Folder Structure

```
app/                        Next.js App Router — routes only, minimal logic
  layout.jsx                 Root layout: fonts, metadata, Navbar/Footer shell
  globals.css                All design tokens (Tailwind v4 @theme + :root)
  page.jsx                   Homepage — composes sections in order
  listings/
    page.jsx                 /listings — PageHero + <ListingsBrowser>
    [id]/page.jsx             /listings/:id — detail page, generateStaticParams
  agents/
    page.jsx, [id]/page.jsx   Same pattern as listings
  blogs/
    page.jsx, [id]/page.jsx   Same pattern as listings
  partners/page.jsx           Partner-focused landing page
  about/page.jsx               Brand story, stats, values
  contact/page.jsx             Contact info + map embed + ContactForm
  crm/
    agent/page.jsx             "Join as Agent" CRM entry point (interest capture)
    partner/page.jsx           "Join as Partner" CRM entry point
    advertiser/page.jsx        "Become an Advertiser" CRM entry point
  legal/
    privacy/, terms/, cookies/page.jsx   Minimal real (non-broken) legal pages

components/
  layout/        Navbar.jsx, MegaMenu.jsx, Footer.jsx — site chrome
  sections/       Homepage sections (Hero, CategoryShowcase, WhyJoin,
                  Membership, HowItWorks, Testimonials, FaqContact) — each
                  one is also reused/adapted on secondary pages
  cards/          Reusable card components (AssetCard, TestimonialCard,
                  MembershipCard, FeatureCard, AgentCard, BlogCard) — one
                  card shape per data type, never duplicated per page
  shared/         Cross-page primitives: Button, Kicker, Container,
                  SectionHeader, Tag, PageHero, ContactForm, FaqAccordion,
                  LegalPage
  listings/       FilterBar.jsx, ListingsBrowser.jsx — /listings-specific
                  client logic
  agents/         AgentsBrowser.jsx — /agents-specific client logic
  crm/            CrmComingSoon.jsx — shared shell for the 3 CRM pages
  ui/             shadcn/ui primitives (button, card, accordion, input,
                  textarea, label, separator, badge, sheet) — generated by
                  the shadcn CLI, treat as vendored code

hooks/
  useScrollReveal.js    Wraps whileInView + viewport-once with token easing
  useMarquee.js         Pause-on-hover/focus + prefers-reduced-motion for
                        the testimonials rail
  useStickySection.js   Scroll-linked step index for the How It Works
                        pinned section (useScroll + useMotionValueEvent)
  useAssetFilters.js    Syncs category/type/search filter state to the URL
                        query string (shareable/bookmarkable filtered views)

lib/
  constants.js    ALL site content/data (nav, categories, listings per
                  category, memberships, testimonials, FAQ, agents, blog
                  posts, footer links). This is the CMS boundary — swap
                  for real API/CMS data here without touching UI code.
  animations.js   Shared Framer Motion variants + easing constants
  utils.js        cn() helper (clsx + tailwind-merge)

public/           Static assets (favicon etc.)
```

**Image sourcing:** every image URL in `lib/constants.js` is generated via
a small `img(seed, w, h)` helper that builds a `picsum.photos/seed/...`
URL. This is a **deliberate placeholder** — there is no real listing
photography or licensed luxury-asset imagery yet. `next.config.mjs`
allowlists `picsum.photos`/`fastly.picsum.photos` via `images.remotePatterns`.
Swapping to real imagery/DAM later only requires changing `constants.js`.

---

## Component Architecture

### `components/shared/Button.jsx`
The single reusable CTA button. `variant`: `primary | secondary | ghost |
outline | accent`. `size`: `sm | default | lg`. Renders as `<Link>` when
`href` is passed, otherwise `<button>`. Wrapped in a `motion.div` using the
shared `buttonHover` variant (lift on hover, scale-down on tap). **Every
button on the site should go through this component**, not a raw `<a>`/
`<button>` with ad hoc classes.

### `components/shared/SectionHeader.jsx`
The kicker → headline → body pattern repeated at the top of nearly every
section. Props: `kicker`, `title`, `description`, `align` (`left | center`),
`action` (optional right-aligned slot, e.g. a "View All" button). Handles
its own scroll-reveal via `useScrollReveal`.

### `components/shared/PageHero.jsx`
The equivalent of `SectionHeader` for full internal pages (Listings,
Partners, Agents, About, Contact, Blogs, CRM) — a compact banner with
kicker/title/description and an optional `children` slot for a CTA.

### `components/cards/AssetCard.jsx`
**The one card shape shared by all five asset categories** (properties,
jets, cars, yachts, watches). Takes an `item` (shape: `{ id, title, type,
location, price, meta, status, image }`) and an `href`. Status renders via
`<Tag>`. Hover: lift (`cardHover`) + image zoom (`imageZoom`), both from
`lib/animations.js`. **Never build a category-specific card** — add fields
to the shared shape instead if a new category needs something extra.

### `components/sections/CategoryShowcase.jsx`
Reusable homepage section: `<SectionHeader>` + a 4-up grid of `<AssetCard>`
+ "View All" button linking to the category's `/listings?category=X` URL.
Used once per category in `app/page.jsx` via `CATEGORIES.map(...)` — this
is *why* adding a 6th asset category later is a `lib/constants.js` change,
not a new component.

### `components/layout/Navbar.jsx` + `MegaMenu.jsx`
Sticky navbar (`position: sticky`, opacity/shadow changes past 24px
scroll via `useMotionValueEvent(scrollY, ...)`). "Listings" nav item opens
`<MegaMenu>` on hover (desktop) — a 5-column image-card panel, one per
category. Below `xl` breakpoint the 3 CTA buttons collapse into a
`Sheet`-based mobile drawer (`components/ui/sheet.jsx`); only the primary
"Become an Advertiser" CTA + hamburger remain visible.

### `components/sections/HowItWorks.jsx`
Scroll-linked "process" section. Uses `useStickySection(stepCount)` to
compute an `activeStep` index from scroll progress through a
`{stepCount * 100}vh`-tall container, with the step list on one side and a
crossfading image (`AnimatePresence`) on the other. This is the direct
equivalent of the design guide's pinned Process section.

### `components/sections/Testimonials.jsx`
Real horizontally-scrollable container (not a fake CSS transform track) —
chosen deliberately for accessibility: native keyboard scroll, a visible
pause/play control, and full `prefers-reduced-motion` support via
`useMarquee`. Auto-advances via `setInterval` + `scrollBy`, loops back to
start at the end. Manual Back/Next arrows call the same `scrollBy` logic.

### `components/shared/ContactForm.jsx`
Reused across the homepage FAQ+Contact section, `/contact`,
`/listings/[id]` (inquire about a listing), `/agents/[id]` (message an
agent), and all three `/crm/*` pages. Currently **simulates** submission
(`setTimeout`) and shows a success state — the `TODO` comment marks where
`/api/contact` should be wired in once a backend exists.

---

## Page Structure

| Route | Composition |
|---|---|
| `/` | Hero → 5× CategoryShowcase (one per category, alternating background) → WhyJoin → Membership → HowItWorks → Testimonials → FaqContact |
| `/listings` | PageHero → `<ListingsBrowser>` (FilterBar: category/type/search, synced to URL via `useAssetFilters`, wrapped in `<Suspense>` because it uses `useSearchParams`) |
| `/listings/[id]` | Full-bleed hero image → title/price/tags → spec grid → description → sticky `<ContactForm>` → related listings from the same category |
| `/agents` | PageHero → `<AgentsBrowser>` (client-side name/specialty/location search) |
| `/agents/[id]` | Portrait → bio → contact details → `<ContactForm>` |
| `/blogs` | PageHero → grid of `<BlogCard>` |
| `/blogs/[id]` | Article layout → "More from the Journal" grid |
| `/partners` | PageHero → 3× `<FeatureCard>` (partner-relevant subset of `WHY_JOIN`) → featured `<MembershipCard>` (partner tier only) |
| `/about` | PageHero → mission split (image + copy) → stats bar → full `<FeatureCard>` grid |
| `/contact` | PageHero → contact details + map embed (OpenStreetMap iframe, no API key needed) + `<ContactForm>` |
| `/crm/agent`, `/crm/partner`, `/crm/advertiser` | `<CrmComingSoon>` shell: PageHero → "coming soon" notice + benefit list → `<ContactForm>` as interim interest capture |
| `/legal/privacy`, `/terms`, `/cookies` | `<LegalPage>` shell — real (if generic) content so footer links aren't dead |

---

## Animation Guidelines

All variants live in `lib/animations.js` — this is the enforcement point
for "restrained, confidence-building" motion (no bounce, no flashy spring
on large elements):

- `fadeUp` / `fadeIn` / `scaleIn` — entrance variants, paired with
  `useScrollReveal()` for `whileInView` reveals (0.6–0.65s,
  `ease-out-expo`).
- `staggerContainer(staggerChildren, delayChildren)` — wrap a grid/section
  and stagger its direct `motion` children (typically 0.06–0.12s stagger).
- `cardHover` / `imageZoom` — the two-part card hover: the card lifts
  (`y: -6`, shadow fades in) while a nested `motion.div` around the image
  zooms independently, so text never blurs.
- `buttonHover` — every `<Button>` lifts 2px on hover, scales to 0.97 on
  tap.
- `accordionChevron` — 180° rotation for the FAQ accordion's chevron icon.

**Rule:** if you need a new transition, add it to `lib/animations.js` and
import it — don't write a bespoke `transition={{ ... }}` inline unless it
is truly one-off and documented why.

---

## Styling Guidelines

- Tailwind v4, **CSS-first config** — there is no `tailwind.config.js`.
  New design tokens are added to `app/globals.css` inside `@theme inline`
  (registers the utility) + `:root` (sets the value).
- Prefer the semantic utilities already registered over raw values:
  `bg-canvas`, `text-ink-muted`, `border-line`, `rounded-card`,
  `rounded-pill`, `shadow-hover`, `ease-out-expo`, `ease-standard`,
  `tracking-kicker`, `tracking-button`.
- No inline `style` objects except where a value is genuinely dynamic and
  can't be a class (e.g. `HowItWorks.jsx`'s `style={{ height: ... }}` for
  a scroll-driven section, or `scrollSnapAlign` in the testimonials rail).
- Breakpoints: standard Tailwind (`sm`/`md`/`lg`/`xl`/`2xl`). The Navbar's
  CTA row collapses at `xl`; most content grids collapse at `sm`/`lg`.
- Component className props always flow through `cn()` from `lib/utils.js`
  so callers can override/extend without fighting specificity.
- Every new page-level component should reuse `<Container>` for the
  1280px max-width shell rather than repeating `mx-auto max-w-[1280px] px-6`.

---

## Future Roadmap

Notes for whoever (human or AI) picks this up next:

- **CRM backend.** `/crm/agent`, `/crm/partner`, `/crm/advertiser` are
  currently interest-capture pages only (`ContactForm`, no real signup).
  Building the actual CRM (agent dashboard, lead routing, listing
  management) is the biggest open item — see the "CRM dashboard — coming
  soon" notice in `components/crm/CrmComingSoon.jsx`.
- **Authentication.** No auth exists yet. Agent/Partner accounts, session
  management, and role-gating (agent vs. partner vs. admin) all need to be
  designed before the CRM can be real.
- **Listing management.** Listings are static data in `lib/constants.js`.
  Real listings need a database, an authenticated create/edit flow for
  agents/partners, image upload, and moderation/verification workflow
  (the "verified marketplace" promise is currently just copy).
- **Payments.** Membership pricing (£499/mo Agent, £999 one-time Partner)
  is displayed but not wired to any payment processor. Needs Stripe (or
  equivalent) subscription + one-time-charge integration.
- **Messaging.** `ContactForm` submissions currently go nowhere (simulated
  `setTimeout`). Needs an `/api/contact` route (or equivalent) that emails
  /notifies the relevant agent, plus a way for agents to see & respond to
  inbound leads from their dashboard.
- **Admin panel.** Verification review (agents, partners, listings),
  content moderation, and site-wide analytics have no interface yet.
- **Real imagery.** Every image is a `picsum.photos` seeded placeholder
  (see `lib/constants.js` → `img()`). Swap for a real DAM/CDN once actual
  listing photography exists — the `img()` helper is the single place to
  change.
- **Search.** Current `/listings` filtering is entirely client-side over a
  small static array (`useAssetFilters` + `ListingsBrowser`). This will
  not scale to a real listings database — plan for server-side
  search/filtering (and likely a real search index) before listing volume
  grows.

---

## Development Conventions

- **JavaScript + JSX only** — no TypeScript. Every component file uses the
  `.jsx` extension (including special App Router files: `layout.jsx`,
  `page.jsx`), not `.js`, to make the JSX-not-TS intent explicit at a
  glance.
- **`"use client"` placement:** only mark a component client when it
  actually needs interactivity/hooks/Framer Motion. Page-level files under
  `app/` stay Server Components where possible (e.g. detail pages, static
  listing pages) and delegate interactive pieces to a dedicated client
  component (e.g. `app/listings/page.jsx` is a server component that
  renders the client `<ListingsBrowser>` inside `<Suspense>`).
- **`useSearchParams` requires `<Suspense>`.** Any page using a component
  that calls `useSearchParams()` (directly or via `useAssetFilters`) must
  wrap that component in `<Suspense>` or the build will warn/fail. See
  `app/listings/page.jsx` for the pattern.
- **Dynamic route `params`/`searchParams` are Promises in this Next.js
  version.** Always `await params` in both the page component and
  `generateMetadata`. See the warning at the top of this file.
- **Data flows one direction:** `lib/constants.js` → components. Never
  hardcode listing/agent/testimonial/FAQ content inside a component —
  add/edit it in `constants.js` so the CMS-swap boundary stays clean.
- **Icon imports:** verify a `lucide-react` icon name actually exists in
  the installed version before using it (brand icons were removed — see
  Tech Stack table). Quick check: `node -e "console.log(!!require('lucide-react').IconName)"`.
- **Import ordering (loose convention, not enforced by lint):** external
  packages first (`react`, `next/*`, `framer-motion`, `lucide-react`),
  then internal absolute imports (`@/components/...`, `@/lib/...`,
  `@/hooks/...`), then relative imports if any.
- **Accessibility expectations:** every interactive control needs a
  visible focus state (handled globally via Tailwind's `outline-ring/50`
  on `*`) and an `aria-label` when it's icon-only (see Navbar's hamburger
  button, Testimonials' play/pause/arrow buttons). Respect
  `prefers-reduced-motion` for any new animation — see the global rule in
  `app/globals.css` and `hooks/useMarquee.js` for the pattern.
- **Performance:** all listing/agent/blog images go through `next/image`
  with an explicit `sizes` prop matched to the grid's actual rendered
  width — don't drop this when adding new image-bearing components.
- **Verify before trusting the build.** `next build`'s static generation
  can succeed while a page still renders wrong content (this happened with
  the async-`params` bug — every detail page "built" successfully but
  actually 404'd). When in doubt, run `npm run dev` and `curl`/open the
  actual route rather than trusting a green build alone.

---

## Future AI Context

If you are picking this project up cold: read the **Next.js version
warning** at the top of this file first — it is the single highest-value
thing to know before touching any `app/` route file, because this Next.js
version's async `params`/`searchParams` behavior differs from what most
training data assumes and fails silently (no build error) rather than
loudly.

Beyond that: the design system is intentionally locked (see **Design
System** above) — this is a content/structure project layered on a
pre-approved visual language, not a green-field design. If a task seems to
call for new colors, fonts, spacing, or motion timings, that is a signal
to check with the user before introducing them, not to improvise within
"reasonable" bounds.

The fastest way to understand "how a new feature should look" here is to
find the closest existing analog and copy its pattern:
- New asset category → add to `CATEGORIES`/`CATEGORY_ITEMS` in
  `lib/constants.js`; `CategoryShowcase` and `AssetCard` handle the rest.
- New card type → look at `components/cards/*` first; there is almost
  certainly a close match to extend rather than a reason to build a new
  card shape from scratch.
- New page → copy `PageHero` + section composition from the closest
  existing page in `app/` (e.g. `/partners` and `/about` are good
  templates for a new marketing page; `/listings` + `/agents` are good
  templates for a new filterable/searchable directory page).
- New form → reuse `<ContactForm>` if the fields match (Name/Phone/Email/
  Message); only build a new form component if the field set genuinely
  differs.

This file should be updated whenever a structural decision changes —
treat stale documentation here as a bug, not a formatting nitpick.
