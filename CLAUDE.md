# CLAUDE.md — Luxora

This file is the single source of truth for the Luxora codebase. Read it
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

> **Landing-only mode is currently ON.** Every internal link/button on the
> site redirects to `/` instead of its real destination — see
> **Landing-Only Navigation Mode** below before you go debugging why a
> button "doesn't work." This is deliberate and temporary, controlled by a
> single flag in `lib/utils.js`.

---

## Project Overview

**Purpose:** Luxora is a luxury marketplace platform connecting buyers with
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
explicitly labeled "Coming Soon." The site is also currently in
**landing-only mode** (see below) — every subpage still exists and builds
correctly, it's just not linked from anywhere in the UI right now. See
**Future Roadmap** below.

---

## Landing-Only Navigation Mode

The client asked to showcase just the homepage for now, without ripping
out or hardcoding over the subpages that are already built. The mechanism:

- **`lib/utils.js` → `LANDING_ONLY_MODE`** (currently `true`) and
  **`resolveHref(href)`**: when the flag is on, `resolveHref` rewrites any
  internal app route back to `"/"`. It leaves same-page anchors (`"/"`,
  `"/#faq"`, `"#..."`) and external/`mailto:`/`tel:` links untouched.
- **`components/shared/SmartLink.jsx`**: a drop-in replacement for
  `next/link` that runs its `href` through `resolveHref`. Used anywhere a
  raw `<Link>` navigates to another route (Navbar links, MegaMenu category
  links, Footer column links).
- **`components/shared/Button.jsx`**: already calls `resolveHref` on its
  `href` prop internally — every `<Button href="...">` across the site
  (CTAs, MembershipCard, PageHero children, etc.) is automatically
  suppressed with zero extra work at call sites.
- **`components/cards/AssetCard.jsx`, `AgentCard.jsx`, `BlogCard.jsx`**:
  resolve their own card-level link internally the same way.
- **Server Components** (the three `[id]/page.jsx` detail pages' "Back to
  X" links) call `resolveHref()` directly since `SmartLink` is a client
  component and can't be used there.
- **`components/sections/Hero.jsx`**: the search form does a programmatic
  `router.push(...)`, which bypasses `<Link>`/`<Button>` entirely — it
  calls `resolveHref()` on the constructed URL before pushing.

**To re-enable full navigation:** flip `LANDING_ONLY_MODE` to `false` in
`lib/utils.js`. Nothing else needs to change — every real `href` is still
intact in `lib/constants.js` and component code, untouched.

**If you add a new internal link:** use `<SmartLink>` (client) or
`resolveHref()` (server) — don't add a raw `<Link href="/somewhere">` or
`<a href="/somewhere">`, or it'll silently bypass landing-only mode.

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
| Utilities | `clsx` + `tailwind-merge` via `lib/utils.js` (`cn()`) | Standard shadcn pattern. `lib/utils.js` also owns `resolveHref()`/`LANDING_ONLY_MODE` (see above). |

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
| `--brand-primary` | `#3F4A36` (olive/sage) | `bg-brand-primary` / `text-brand-primary` | Primary buttons, active states, links, dark cards (Footer, WhyJoin "Our Marketplace" card) |
| `--brand-primary-hover` | `#333B2A` | `hover:bg-brand-primary-hover` | Primary button hover |
| `--brand-secondary` | `#B1603A` (terracotta) | `bg-brand-secondary` / `text-brand-secondary` | Status tags, accents, step numbers, WhyJoin checkmark bullets |
| `--line` | `#E5DFD2` | `border-line` | Card borders, dividers |
| `--status-for-sale` / `-for-rent` / `-sold` / `-success` / `-error` | see `globals.css` | `bg-status-*` | `components/shared/Tag.jsx` |

shadcn's semantic tokens (`--primary`, `--secondary`, `--muted`, `--accent`,
`--destructive`, `--border`, `--ring`, etc.) are mapped 1:1 onto this
palette in the same file, so any `components/ui/*` primitive automatically
matches the brand without extra work. **Dark mode is intentionally not
implemented** — the source design guide explicitly lists dark mode as an
anti-pattern for this brand, so there is no `.dark` block.

**Text-on-dark-background rule:** wherever a section sits on `bg-brand-primary`
(`#3F4A36`) or another dark/photo background, text must use `text-on-dark`
(or the literal `text-[#FAF7F1]`) — never `text-ink-muted` or `.kicker`'s
default `text-brand-primary`, both of which assume a light canvas and go
near-invisible on olive. See `components/layout/Footer.jsx` for the
reference implementation (every text node explicitly overridden to
`text-[#FAF7F1]` at full or reduced opacity once the footer background
became `bg-[#3F4A36]`). When a competing utility class already sets the
same CSS property (e.g. overriding `.kicker`'s baked-in `text-brand-primary`),
use the `!` important suffix (`text-[#FAF7F1]/60!`) — plain class-order
cascade is not reliable across Tailwind's utility/`@layer utilities` split.

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
- **Custom cursor:** `components/cards/CustomCursor.jsx` renders a
  spring-following `/chevron5.png` glyph on `AssetCard` hover (the card
  itself sets `cursor-none` on its link). This is a one-off flourish for
  asset cards specifically — don't propagate `cursor-none` + a custom
  cursor to other components without a reason.

---

## Folder Structure

```
app/                        Next.js App Router — routes only, minimal logic
  layout.jsx                 Root layout: fonts, metadata, NavbarWrapper/Footer shell
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
  layout/        NavbarWrapper.jsx (hide-on-scroll-down chrome) wrapping
                  Navbar.jsx, plus MegaMenu.jsx, Footer.jsx — site chrome
  sections/       Homepage sections (Hero, CategoryShowcase, WhyJoin,
                  Membership, HowItWorks, Testimonials, FaqContact) — each
                  one is also reused/adapted on secondary pages
  cards/          Reusable card components (AssetCard, CustomCursor,
                  TestimonialCard, MembershipCard, FeatureCard, AgentCard,
                  BlogCard) — one card shape per data type, never
                  duplicated per page
  shared/         Cross-page primitives: Button, SmartLink, Kicker,
                  Container, SectionHeader, Tag, PageHero, ContactForm,
                  FaqAccordion, LegalPage
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
  utils.js        cn() helper (clsx + tailwind-merge) + resolveHref() /
                  LANDING_ONLY_MODE (see Landing-Only Navigation Mode)

public/           Static assets: favicon, /blacklogo.png (navbar logo —
                  currently a generic placeholder wordmark, not a real
                  Luxora mark, see Future Roadmap), /chevron5.png|6.png
                  (custom cursor glyph), /aivideo(1).mp4 (Hero background
                  video), misc stock photos
```

**Image sourcing:** two helpers in `lib/constants.js`, both placeholders
pending real photography/DAM:
- **`img(seed, w, h)`** — a `picsum.photos/seed/...` URL. Fully random,
  content-unrelated. Still used for testimonials, agent portraits, and
  blog cover images.
- **`photo(keywords, w, h)`** — a `loremflickr.com/{w}/{h}/{keywords}`
  URL. Keyword-tagged real stock photography, so the image is actually
  *relevant* to the title (e.g. a Ferrari card gets a real car photo, not
  an arbitrary picsum seed). Used for every `PROPERTIES`/`JETS`/`CARS`/
  `YACHTS`/`WATCHES` item and the `HOW_IT_WORKS` steps. When adding a new
  asset-card item, use `photo()` with 2–3 comma-separated keywords
  describing the subject, not `img()`.

`next.config.mjs` allowlists `picsum.photos`, `fastly.picsum.photos`, and
`loremflickr.com` via `images.remotePatterns` — add any new image host
there before using it in a `next/image` `src`.

---

## Component Architecture

### `components/shared/Button.jsx`
The single reusable CTA button. `variant`: `primary | secondary | ghost |
outline | accent`. `size`: `sm | default | lg`. Renders as `<Link>` when
`href` is passed, otherwise `<button>` — the `href` is passed through
`resolveHref()` first (see Landing-Only Navigation Mode). Wrapped in a
`motion.div` using the shared `buttonHover` variant (lift on hover,
scale-down on tap). **Every button on the site should go through this
component**, not a raw `<a>`/`<button>` with ad hoc classes.

### `components/shared/SmartLink.jsx`
Drop-in `next/link` replacement that applies `resolveHref()` to its
`href`. Use for any raw internal `<Link>` (Navbar, MegaMenu, Footer). Note
it's a plain function component (no `forwardRef`) — don't use it inside a
base-ui `render={<SmartLink .../>}` clone prop (e.g. `SheetClose`), which
needs ref-forwarding; use `<Link href={resolveHref(...)} />` directly
there instead (see `Navbar.jsx`'s mobile sheet for the pattern).

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
location, price, meta, status, image }`, optionally `beds`/`baths`/`sqft`)
and an `href`. Status renders via `<Tag>`. Hover: lift + image zoom, plus
a following `<CustomCursor>` glyph (card sets `cursor-none`). **The
bed/bath/sq-ft stats row only renders when `item.beds`/`baths`/`sqft` are
all present on the data** (`hasHomeStats` check) — this is deliberately
data-driven, not category-driven, because even within "properties" a
private island (`prop-4`, no bed/bath data) doesn't have meaningful
bed/bath numbers. Everything without that data (jets, cars, yachts,
watches, and any outlier property) falls back to `item.meta`, a free-text
category-appropriate spec line (e.g. "986 hp · 0–60 in 2.5s" for a car,
"19 pax · 7,750 nm range" for a jet). **Never build a category-specific
card** — add fields to the shared shape instead if a new category needs
something extra.

### `components/sections/CategoryShowcase.jsx`
Reusable homepage section: `<SectionHeader>` + a 4-up grid of `<AssetCard>`
+ "View All" button linking to `category.href`. Takes a `category` object
(`{ kicker, label, description, href }`) and an `items` array — the
`category` doesn't have to be a real entry from `CATEGORIES`; `app/page.jsx`
also feeds it a synthetic merged category (see Page Structure below) for
the consolidated "More Collections" section, so this component works for
both a single real category and an ad hoc mixed grid.

### `components/layout/NavbarWrapper.jsx` + `Navbar.jsx` + `MegaMenu.jsx`
`NavbarWrapper` is the outer chrome: a `fixed` (not `sticky`), pill-shaped
container that tracks scroll direction and slides the whole navbar out of
view on scroll-down / back in on scroll-up (independent of `Navbar.jsx`'s
own scrolled-background-opacity logic, which still triggers on scroll
distance past 24px). `Navbar.jsx` renders the `/public/blacklogo.png`
wordmark (see Future Roadmap — it's a generic placeholder, not a real
Luxora mark), the nav links, and desktop/mobile CTAs. "Listings" nav item
opens `<MegaMenu>` on hover (desktop) — a 5-column image-card panel, one
per category. Below `xl` breakpoint the CTA buttons collapse into a
`Sheet`-based mobile drawer (`components/ui/sheet.jsx`); only the primary
"Become an Advertiser" CTA + hamburger remain visible.

### `components/sections/WhyJoin.jsx`
Full-bleed photo-background comparison block — **not** a plain feature
grid. Kicker + big headline over a golden-hour photo (`loremflickr`), then
two cards side by side: a light "Other Marketplaces" card (`WHY_JOIN_OTHERS`
from `lib/constants.js`, X-circle bullets) beside a `bg-brand-primary`
"Our Marketplace" card (`WHY_JOIN`, terracotta check-circle bullets). This
mirrors the design guide's "Why Realist" / "Other agencies vs. Our agency"
component. `components/cards/FeatureCard.jsx` (the plain icon+title+body
card) is *not* used here anymore, but is still used on `/about` and
`/partners` — don't delete it.

### `components/sections/HowItWorks.jsx`
Scroll-linked "process" section. Uses `useStickySection(stepCount)` to
compute an `activeStep` index from scroll progress through a
`{stepCount * 100}vh`-tall container, with the step list on one side and a
crossfading image (`AnimatePresence`) on the other. This is the direct
equivalent of the design guide's pinned Process section. Step images come
from `HOW_IT_WORKS[].image` in `lib/constants.js`, built with `photo()` —
keyword-matched to each step's action (signup, pricing, listing
photography, handshake/success), not a random seed.

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
| `/` | Hero → `CategoryShowcase` (Luxury Properties) → `CategoryShowcase` ("More Collections": one flagship item each from Jets/Cars/Yachts/Watches, single shared "View All") → WhyJoin (comparison block) → Membership → HowItWorks → Testimonials → FaqContact |
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

All of the above still exist and build/render correctly — they're simply
unreachable via UI navigation right now because of **landing-only mode**
(see above). Don't assume a page is dead just because nothing links to it.

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
- **Overriding a color on a dark/photo background:** if the element also
  carries a utility class that sets the same color property (e.g. `.kicker`'s
  built-in `text-brand-primary`), your override needs the `!` important
  suffix (`text-[#FAF7F1]/60!`) to reliably win — see Design System →
  color palette above.

---

## Future Roadmap

Notes for whoever (human or AI) picks this up next:

- **Landing-only mode is temporary.** Flip `LANDING_ONLY_MODE` to `false`
  in `lib/utils.js` once subpages are ready to be linked again — see
  Landing-Only Navigation Mode above. Nothing else needs to change.
- **Real logo.** `/public/blacklogo.png` (used in `Navbar.jsx`) is a
  generic "REAL STATE COMPANY" placeholder wordmark left over from the
  template this was built from — it doesn't say "Luxora" anywhere. Needs a
  real Luxora mark before this ships publicly.
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
- **Real imagery.** Every image is still a placeholder: `photo()`
  (loremflickr, keyword-matched) for asset cards and How It Works, `img()`
  (picsum, random) for testimonials/agents/blog. Swap both for a real
  DAM/CDN once actual listing photography exists — see Folder Structure →
  Image sourcing for the two helpers.
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
- **Internal navigation goes through `resolveHref`.** See Landing-Only
  Navigation Mode above — use `<Button href>`, `<SmartLink>`, or
  `resolveHref()` directly in Server Components, never a raw `href="/..."`.
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
  width — don't drop this when adding new image-bearing components. Any
  new external image host needs a `next.config.mjs` → `images.remotePatterns`
  entry or the build will reject it.
- **Verify before trusting the build.** `next build`'s static generation
  can succeed while a page still renders wrong content (this happened with
  the async-`params` bug — every detail page "built" successfully but
  actually 404'd). When in doubt, run `npm run dev` and `curl`/open the
  actual route rather than trusting a green build alone. When adding new
  external image URLs, verify them with a HEAD request before committing
  them to `constants.js` — a wrong/guessed image ID fails silently as a
  broken `next/image` at runtime, not a build error.

---

## Future AI Context

If you are picking this project up cold: read the **Next.js version
warning** and **Landing-Only Navigation Mode** sections at the top of this
file first. The async `params`/`searchParams` behavior differs from what
most training data assumes and fails silently (no build error) rather than
loudly; landing-only mode means "this button doesn't go anywhere" is
expected behavior right now, not a bug to fix.

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
  Use `photo(keywords)` for the image, not `img(seed)` (see Folder
  Structure → Image sourcing).
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
- New internal link → `<SmartLink>` or `<Button href>` (client), or
  `resolveHref()` directly (server) — see Landing-Only Navigation Mode.

This file should be updated whenever a structural decision changes —
treat stale documentation here as a bug, not a formatting nitpick.
