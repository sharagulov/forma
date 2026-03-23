"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("forma-loaded")) {
      setHidden(true);
      return;
    }

    const start = performance.now();
    const dur = 900;
    let raf: number;

    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / dur) * 100));
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("forma-loaded", "1");
        setTimeout(() => setHidden(true), 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <p className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--fg)]">
        FORMA
      </p>
      <div className="mt-6 h-px w-48 overflow-hidden bg-[var(--line)]">
        <div
          className="h-full origin-left bg-[var(--accent)] transition-[transform] duration-300"
          style={{ transform: `scaleX(${pct / 100})` }}
        />
      </div>
      <p className="mt-3 font-mono text-xs text-[var(--muted)]">{pct}%</p>
    </div>
  );
}
