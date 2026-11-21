"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ConfettiEffect = dynamic(() => import("react-confetti"), {
  ssr: false,
});

export default function Confetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || window.innerWidth < 768) {
      return;
    }

    setEnabled(true);

    function updateDimensions() {
      window.requestAnimationFrame(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className="confetti" aria-hidden="true">
      <ConfettiEffect
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={120}
        recycle={false}
      />
    </div>
  );
}
