"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onModalLock = () => lenis.stop();
    const onModalUnlock = () => lenis.start();
    window.addEventListener("forma:modal-scroll-lock", onModalLock);
    window.addEventListener("forma:modal-scroll-unlock", onModalUnlock);

    return () => {
      window.removeEventListener("forma:modal-scroll-lock", onModalLock);
      window.removeEventListener("forma:modal-scroll-unlock", onModalUnlock);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
