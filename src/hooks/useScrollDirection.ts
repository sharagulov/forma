"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollDirection(): "up" | "down" | null {
  const [dir, setDir] = useState<"up" | "down" | null>(null);
  const last = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    last.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last.current;
      if (Math.abs(delta) < 8) return;
      setDir(delta > 0 ? "down" : "up");
      last.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return dir;
}
