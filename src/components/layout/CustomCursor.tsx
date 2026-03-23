"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    if (reduced || coarse) return;

    setVisible(true);

    const move = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const down = () => setActive(true);
    const up = () => setActive(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden mix-blend-difference md:block"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
      }}
      aria-hidden
    >
      <div
        className={`h-8 w-8 rounded-full border border-white/80 transition-transform duration-200 ease-out ${
          active ? "scale-150" : "scale-100"
        }`}
      />
    </div>
  );
}
