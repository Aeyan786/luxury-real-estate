// Central content/data store for the marketplace. Keeping this separate
// from components means every section stays a pure presentational piece —
// swap this file for CMS/API data later without touching UI code.

export const SITE = {
  name: "Vebryx",
  tagline: "The marketplace for extraordinary assets",
  description:
    "A curated global marketplace for luxury properties, private jets, luxury cars, super yachts, and fine watches.",
};

function img(seed, w = 1200, h = 900) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings", mega: true },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
];

export const NAV_CTAS = [
  { label: "Join as Agent", href: "/crm/agent", variant: "ghost" },
  { label: "Join as Partner", href: "/crm/partner", variant: "primary" },
  { label: "Become an Advertiser", href: "/crm/advertiser", variant: "primary" },
];

export const CATEGORIES = [
  {
    slug: "properties",
    label: "Luxury Properties",
    kicker: "Real Estate",
    singular: "Property",
    description:
      "Villas, penthouses, private islands, and country estates in the world's most coveted addresses.",
    href: "/listings?category=properties",
  },
  {
    slug: "jets",
    label: "Private Jets",
    kicker: "Aviation",
    singular: "Aircraft",
    description:
      "Business and long-range jets available to purchase, charter, or fractional-own.",
    href: "/listings?category=jets",
  },
  {
    slug: "cars",
    label: "Luxury Cars",
    kicker: "Automotive",
    singular: "Vehicle",
    description:
      "Marque-verified hypercars and grand tourers from the world's most desirable automakers.",
    href: "/listings?category=cars",
  },
  {
    slug: "yachts",
    label: "Super Yachts",
    kicker: "Marine",
    singular: "Yacht",
    description:
      "Mega yachts, explorer yachts, and charter-ready vessels crewed and ready to sail.",
    href: "/listings?category=yachts",
  },
  {
    slug: "watches",
    label: "Luxury Watches",
    kicker: "Timepieces",
    singular: "Timepiece",
    description:
      "Provenance-verified references from the horology houses collectors compete for.",
    href: "/listings?category=watches",
  },
];

export const PROPERTIES = [
  {
    id: "prop-1",
    title: "Villa Oliveto",
    type: "Luxury Villa",
    location: "Lake Como, Italy",
    price: "$18,500,000",
    meta: "6 bed · 7 bath · 9,800 sq ft",
    status: "For Sale",
    image: img("villa-oliveto"),
  },
  {
    id: "prop-2",
    title: "The Shoreline Residence",
    type: "Beachfront Home",
    location: "Malibu, California",
    price: "$34,200,000",
    meta: "5 bed · 6 bath · 7,400 sq ft",
    status: "For Sale",
    image: img("shoreline-residence"),
  },
  {
    id: "prop-3",
    title: "Aurum Sky Penthouse",
    type: "Penthouse",
    location: "Dubai Marina, UAE",
    price: "$12,900,000",
    meta: "4 bed · 5 bath · 6,100 sq ft",
    status: "For Sale",
    image: img("aurum-sky-penthouse"),
  },
  {
    id: "prop-4",
    title: "Isla Serena",
    type: "Private Island",
    location: "Exuma, Bahamas",
    price: "$62,000,000",
    meta: "14 acres · 3 residences",
    status: "For Sale",
    image: img("isla-serena"),
  },
  {
    id: "prop-5",
    title: "Château des Vignes",
    type: "Country Estate",
    location: "Provence, France",
    price: "$28,750,000",
    meta: "9 bed · 11 bath · 22,000 sq ft",
    status: "For Sale",
    image: img("chateau-des-vignes"),
  },
  {
    id: "prop-6",
    title: "Ridgeline Retreat",
    type: "Luxury Villa",
    location: "Aspen, Colorado",
    price: "$46,000 / mo",
    meta: "7 bed · 8 bath · 11,200 sq ft",
    status: "For Rent",
    image: img("ridgeline-retreat"),
  },
];

export const JETS = [
  {
    id: "jet-1",
    title: "Gulfstream G700",
    type: "Long-Range Jet",
    location: "Available Worldwide",
    price: "$78,000,000",
    meta: "19 pax · 7,750 nm range",
    status: "For Sale",
    image: img("gulfstream-g700"),
  },
  {
    id: "jet-2",
    title: "Bombardier Global 7500",
    type: "Long-Range Jet",
    location: "Based in Geneva",
    price: "$71,500,000",
    meta: "17 pax · 7,700 nm range",
    status: "For Sale",
    image: img("bombardier-7500"),
  },
  {
    id: "jet-3",
    title: "Cessna Citation Longitude",
    type: "Business Jet",
    location: "Based in Miami",
    price: "$28,500 / charter hr",
    meta: "12 pax · 3,500 nm range",
    status: "Charter",
    image: img("citation-longitude"),
  },
  {
    id: "jet-4",
    title: "Dassault Falcon 8X",
    type: "Long-Range Jet",
    location: "Based in Dubai",
    price: "$59,000,000",
    meta: "16 pax · 6,450 nm range",
    status: "For Sale",
    image: img("falcon-8x"),
  },
];

export const CARS = [
  {
    id: "car-1",
    title: "Ferrari SF90 Stradale",
    type: "Ferrari",
    location: "Monaco",
    price: "$625,000",
    meta: "986 hp · 0–60 in 2.5s",
    status: "For Sale",
    image: img("ferrari-sf90"),
  },
  {
    id: "car-2",
    title: "Lamborghini Revuelto",
    type: "Lamborghini",
    location: "Milan, Italy",
    price: "$608,000",
    meta: "1,001 hp · V12 hybrid",
    status: "For Sale",
    image: img("lamborghini-revuelto"),
  },
  {
    id: "car-3",
    title: "Bugatti Chiron Profilée",
    type: "Bugatti",
    location: "Molsheim, France",
    price: "$9,800,000",
    meta: "1,500 hp · 1 of 1",
    status: "For Sale",
    image: img("bugatti-chiron"),
  },
  {
    id: "car-4",
    title: "Rolls-Royce Phantom",
    type: "Rolls Royce",
    location: "London, UK",
    price: "$545,000",
    meta: "563 hp · Bespoke coachline",
    status: "For Sale",
    image: img("rolls-royce-phantom"),
  },
  {
    id: "car-5",
    title: "Bentley Continental GT Speed",
    type: "Bentley",
    location: "Crewe, UK",
    price: "$285,000",
    meta: "650 hp · W12",
    status: "For Sale",
    image: img("bentley-continental"),
  },
  {
    id: "car-6",
    title: "McLaren 750S",
    type: "McLaren",
    location: "Woking, UK",
    price: "$332,000",
    meta: "740 hp · Carbon monocoque",
    status: "For Sale",
    image: img("mclaren-750s"),
  },
];

export const YACHTS = [
  {
    id: "yacht-1",
    title: "M/Y Solstice",
    type: "Mega Yacht",
    location: "Port Hercules, Monaco",
    price: "$185,000,000",
    meta: "95m · 12 guests · 24 crew",
    status: "For Sale",
    image: img("my-solstice"),
  },
  {
    id: "yacht-2",
    title: "S/Y Meridian",
    type: "Explorer Yacht",
    location: "Antibes, France",
    price: "$42,000,000",
    meta: "58m · Ice-class hull",
    status: "For Sale",
    image: img("sy-meridian"),
  },
  {
    id: "yacht-3",
    title: "M/Y Azure Horizon",
    type: "Charter Yacht",
    location: "Based in Ibiza",
    price: "$395,000 / week",
    meta: "48m · 10 guests · 14 crew",
    status: "Charter",
    image: img("azure-horizon"),
  },
  {
    id: "yacht-4",
    title: "M/Y Nautilus Prime",
    type: "Luxury Yacht",
    location: "Fort Lauderdale, USA",
    price: "$68,500,000",
    meta: "62m · Infinity pool",
    status: "For Sale",
    image: img("nautilus-prime"),
  },
];

export const WATCHES = [
  {
    id: "watch-1",
    title: "Daytona Ref. 116500LN",
    type: "Rolex",
    location: "Provenance Verified",
    price: "$42,500",
    meta: "Ceramic bezel · Full set",
    status: "For Sale",
    image: img("rolex-daytona"),
  },
  {
    id: "watch-2",
    title: "Nautilus Ref. 5711",
    type: "Patek Philippe",
    location: "Provenance Verified",
    price: "$185,000",
    meta: "Discontinued reference",
    status: "For Sale",
    image: img("patek-nautilus"),
  },
  {
    id: "watch-3",
    title: "RM 011 Flyback Chronograph",
    type: "Richard Mille",
    location: "Provenance Verified",
    price: "$265,000",
    meta: "Titanium case · Full set",
    status: "For Sale",
    image: img("richard-mille-011"),
  },
  {
    id: "watch-4",
    title: "Royal Oak Ref. 15500",
    type: "Audemars Piguet",
    location: "Provenance Verified",
    price: "$58,000",
    meta: "Stainless steel · Blue dial",
    status: "For Sale",
    image: img("ap-royal-oak"),
  },
  {
    id: "watch-5",
    title: "Vintage Reference Collection",
    type: "Luxury Collections",
    location: "Curated Lot",
    price: "On Request",
    meta: "12-piece private collection",
    status: "For Sale",
    image: img("luxury-watch-collection"),
  },
];

export const CATEGORY_ITEMS = {
  properties: PROPERTIES,
  jets: JETS,
  cars: CARS,
  yachts: YACHTS,
  watches: WATCHES,
};

export const MEMBERSHIPS = [
  {
    id: "partner",
    title: "Partner Membership",
    price: "£999",
    billing: "One-Time Fee",
    cta: "Become a Partner",
    href: "/crm/partner",
    featured: true,
    benefits: [
      "Verified Partner Badge",
      "Unlimited Listings",
      "Featured Placement",
      "Lead Dashboard",
      "CRM Access (Coming Soon)",
      "Priority Support",
      "Premium Analytics",
    ],
  },
  {
    id: "agent",
    title: "Agent Membership",
    price: "£499",
    billing: "Per Month",
    cta: "Join as Agent",
    href: "/crm/agent",
    featured: false,
    benefits: [
      "Verified Agent Profile",
      "Unlimited Listings",
      "Personal Dashboard",
      "Monthly Lead Generation",
      "Marketing Tools",
      "CRM Access",
      "Priority Support",
    ],
  },
];

export const WHY_JOIN = [
  {
    icon: "Globe2",
    title: "Global Exposure",
    description:
      "Your listings surface to a network of qualified buyers across every major market, not just your local territory.",
  },
  {
    icon: "UserCheck",
    title: "Qualified Buyers",
    description:
      "Every inquiry is pre-screened, so the leads reaching your dashboard are ready to transact, not just browsing.",
  },
  {
    icon: "Gem",
    title: "Luxury Audience",
    description:
      "Vebryx is positioned exclusively for high-value assets, keeping your listings among a genuinely comparable audience.",
  },
  {
    icon: "ShieldCheck",
    title: "Verified Marketplace",
    description:
      "Every agent, partner, and listing is verified before publishing, protecting the trust your brand depends on.",
  },
  {
    icon: "Sparkles",
    title: "Premium Branding",
    description:
      "Featured placement and editorial-quality presentation put your assets forward the way they deserve to be seen.",
  },
  {
    icon: "LifeBuoy",
    title: "Dedicated Support",
    description:
      "A named support contact for every member — not a ticket queue — from onboarding through your first close.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Account",
    description:
      "Register as an agent, partner, or advertiser in minutes and set up your verified profile.",
    image: img("how-it-works-account", 1200, 1500),
  },
  {
    step: "02",
    title: "Choose Membership",
    description:
      "Select the plan that matches how you sell — monthly agent access or a one-time partner fee.",
    image: img("how-it-works-membership", 1400, 900),
  },
  {
    step: "03",
    title: "List Luxury Assets",
    description:
      "Publish properties, jets, cars, yachts, or watches with our editorial-grade listing tools.",
    image: img("how-it-works-listing", 1200, 1500),
  },
  {
    step: "04",
    title: "Receive Qualified Leads",
    description:
      "Inquiries route directly to your dashboard, pre-screened and ready for you to close.",
    image: img("how-it-works-leads", 1400, 900),
  },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    kind: "quote",
    quote:
      "Vebryx changed how we sell nine-figure listings. The audience is genuinely qualified — no tire-kickers.",
    name: "Isabelle Marchetti",
    role: "Luxury Real Estate Agent",
    location: "Monaco",
    image: img("testimonial-isabelle"),
  },
  {
    id: "t2",
    kind: "photo",
    name: "Julian Voss",
    role: "Aviation Broker",
    location: "Zurich",
    image: img("testimonial-julian"),
  },
  {
    id: "t3",
    kind: "quote",
    quote:
      "As a brand partner, the verification standard here is what sold us. Our watches sit alongside serious buyers only.",
    name: "Amara Chen",
    role: "Partner, Horology House",
    location: "Singapore",
    image: img("testimonial-amara"),
  },
  {
    id: "t4",
    kind: "video",
    quote: "Watch how a Vebryx partnership tripled our qualified inbound leads in one quarter.",
    name: "Marcus Alden",
    role: "Investor & Partner",
    location: "London",
    image: img("testimonial-marcus"),
  },
  {
    id: "t5",
    kind: "quote",
    quote:
      "The dashboard alone is worth the membership. I know exactly which listings are converting and why.",
    name: "Priya Kapoor",
    role: "Yacht Charter Agent",
    location: "Dubai",
    image: img("testimonial-priya"),
  },
  {
    id: "t6",
    kind: "photo",
    name: "Thomas Reyes",
    role: "Automotive Dealer Partner",
    location: "Miami",
    image: img("testimonial-thomas"),
  },
];

export const FAQ_GROUPS = [
  {
    category: "Membership",
    items: [
      {
        q: "What's the difference between Agent and Partner membership?",
        a: "Agent membership is a monthly plan built for individual brokers and realtors actively selling on their own. Partner membership is a one-time fee designed for agencies, dealerships, and brands listing at volume, with featured placement and premium analytics included.",
      },
      {
        q: "Can I upgrade from Agent to Partner later?",
        a: "Yes. Your listings, dashboard history, and lead data carry over automatically when you upgrade — nothing needs to be re-created.",
      },
    ],
  },
  {
    category: "Listings",
    items: [
      {
        q: "Which asset categories can I list?",
        a: "Luxury properties, private jets, luxury cars, super yachts, and fine watches. Every category shares the same verification and listing-quality standard.",
      },
      {
        q: "Is there a limit to how many listings I can publish?",
        a: "No — both membership tiers include unlimited listings. Featured placement is prioritized for Partner members.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "How is the Partner one-time fee billed?",
        a: "£999 is charged once at signup and covers your Partner membership indefinitely — there's no recurring renewal.",
      },
      {
        q: "When is the Agent monthly fee charged?",
        a: "£499 is billed monthly from your signup date. You can cancel anytime from your dashboard with no additional fees.",
      },
    ],
  },
  {
    category: "Verification",
    items: [
      {
        q: "How does Vebryx verify agents and partners?",
        a: "Every member completes an identity and business-license check before their profile goes live, and listings are spot-checked for accuracy before featured placement is granted.",
      },
      {
        q: "What does the Verified Partner Badge mean for buyers?",
        a: "It signals that a partner's identity, business standing, and listing history have been reviewed directly by the Vebryx team — not just self-reported.",
      },
    ],
  },
  {
    category: "Advertising",
    items: [
      {
        q: "How do I become an advertiser rather than a listing agent?",
        a: "Use the \"Become an Advertiser\" button in the navigation to start a placement inquiry — advertising is scoped separately from agent/partner listing accounts.",
      },
      {
        q: "What advertising placements are available?",
        a: "Homepage featured placement, category-page takeovers, and newsletter placement are available; our team will scope options once you submit an inquiry.",
      },
    ],
  },
];

export const AGENTS = [
  {
    id: "agent-1",
    name: "Isabelle Marchetti",
    location: "Monaco",
    email: "isabelle@vebryx.com",
    phone: "+377 93 15 22 41",
    specialty: "Luxury Properties",
    image: img("agent-isabelle"),
  },
  {
    id: "agent-2",
    name: "Julian Voss",
    location: "Zurich, Switzerland",
    email: "julian@vebryx.com",
    phone: "+41 44 200 18 63",
    specialty: "Private Jets",
    image: img("agent-julian"),
  },
  {
    id: "agent-3",
    name: "Priya Kapoor",
    location: "Dubai, UAE",
    email: "priya@vebryx.com",
    phone: "+971 4 559 2210",
    specialty: "Super Yachts",
    image: img("agent-priya"),
  },
  {
    id: "agent-4",
    name: "Thomas Reyes",
    location: "Miami, USA",
    email: "thomas@vebryx.com",
    phone: "+1 305 555 0148",
    specialty: "Luxury Cars",
    image: img("agent-thomas"),
  },
  {
    id: "agent-5",
    name: "Amara Chen",
    location: "Singapore",
    email: "amara@vebryx.com",
    phone: "+65 6714 8890",
    specialty: "Luxury Watches",
    image: img("agent-amara"),
  },
  {
    id: "agent-6",
    name: "Marcus Alden",
    location: "London, UK",
    email: "marcus@vebryx.com",
    phone: "+44 20 7946 0091",
    specialty: "Luxury Properties",
    image: img("agent-marcus"),
  },
];

export const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "Inside the World's Most Exclusive Private Island Sales",
    category: "Guide",
    date: "2026-06-02",
    author: "Isabelle Marchetti",
    image: img("blog-private-islands"),
  },
  {
    id: "blog-2",
    title: "Why Long-Range Jets Are Outselling Mid-Size Fleets in 2026",
    category: "News",
    date: "2026-05-18",
    author: "Julian Voss",
    image: img("blog-longrange-jets"),
  },
  {
    id: "blog-3",
    title: "A Buyer's Guide to Provenance-Verified Timepieces",
    category: "Guide",
    date: "2026-04-27",
    author: "Amara Chen",
    image: img("blog-timepieces"),
  },
  {
    id: "blog-4",
    title: "The Explorer Yacht Boom: What's Driving Demand",
    category: "News",
    date: "2026-04-09",
    author: "Priya Kapoor",
    image: img("blog-explorer-yachts"),
  },
  {
    id: "blog-5",
    title: "Hypercar Allocation: How Verified Buyers Get First Access",
    category: "Guide",
    date: "2026-03-22",
    author: "Thomas Reyes",
    image: img("blog-hypercars"),
  },
  {
    id: "blog-6",
    title: "What 'Verified Marketplace' Actually Means at Vebryx",
    category: "News",
    date: "2026-03-05",
    author: "Marcus Alden",
    image: img("blog-verified-marketplace"),
  },
];

export const FOOTER_LINKS = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Agents", href: "/agents" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
  Marketplace: CATEGORIES.map((c) => ({ label: c.label, href: c.href })),
  Membership: [
    { label: "Join as Agent", href: "/crm/agent" },
    { label: "Join as Partner", href: "/crm/partner" },
    { label: "Become an Advertiser", href: "/crm/advertiser" },
  ],
  Resources: [
    { label: "Blogs", href: "/blogs" },
    { label: "FAQ", href: "/#faq" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
};

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
];
