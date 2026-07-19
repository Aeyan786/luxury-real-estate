// Shared Framer Motion variants — the single source of truth for motion
// across the app. Import these rather than redefining transitions inline,
// so the "restrained, confidence-building" motion language from the design
// guide (Section 12) stays consistent everywhere.

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
export const EASE_STANDARD = [0.4, 0, 0.2, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

// Wrap a section/grid with this and stagger its direct children.
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

// Card hover: lift + shadow (no scale on the card itself — the inner image
// handles the zoom so content never blurs on hover).
export const cardHover = {
  rest: { y: 0, boxShadow: "0 0 0 rgba(30,28,24,0)" },
  hover: {
    y: -6,
    boxShadow: "0 16px 40px rgba(30,28,24,0.10)",
    transition: { duration: 0.35, ease: EASE_STANDARD },
  },
};

export const imageZoom = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.4, ease: EASE_STANDARD } },
};

export const buttonHover = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: 0.25, ease: EASE_STANDARD } },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
};

export const accordionChevron = {
  closed: { rotate: 0 },
  open: { rotate: 180, transition: { duration: 0.25, ease: EASE_STANDARD } },
};

// Viewport defaults shared by every `whileInView` usage.
export const viewportOnce = { once: true, margin: "-80px 0px -80px 0px" };
