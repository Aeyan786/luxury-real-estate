"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CustomCursor({ visible }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
  });

  const y = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
<motion.div
  style={{ x, y }}
  initial={{
    opacity: 0,
    scale: 0.85,
    rotate: -8,
    filter: "blur(6px)",
  }}
  animate={{
    opacity: visible ? 1 : 0,
    scale: visible ? 1 : 0.85,
    rotate: visible ? 0 : -8,
    filter: visible ? "blur(0px)" : "blur(4px)",
  }}
  transition={{
    duration: 0.85,
    ease: [0.16, 1, 0.7, 1], // Luxury easing
  }}
  className="pointer-events-none fixed left-0 top-0 z-[9999] origin-center"
>
  <Image
    src="/chevron5.png"
    alt=""
    width={80}
    height={80}
    draggable={false}
  />
</motion.div>
  );
}