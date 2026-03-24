"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const inner = el.querySelectorAll<HTMLElement>("[data-word]");
    gsap.fromTo(
      inner,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, [text]);

  const words = text.split(" ");

  return (
    <h1 ref={containerRef} className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-baseline pb-[0.01em]"
        >
          <span
            data-word
            className="inline-block will-change-transform pb-[0.08em]"
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </h1>
  );
}
