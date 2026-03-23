"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import {
  BLUR_DATA_URL,
  QUALITY_HERO,
} from "@/lib/image-assets";

/** Локальный hero: `public/images/hero/hero.png` → URL `/images/hero/hero.png` */
const heroSrc = "/images/hero/hero.png";

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => {
      const y = window.scrollY * 0.28;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pb-24 pt-32 md:items-center md:pb-32">
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 scale-[1.12] will-change-transform"
        >
          <Image
            src={heroSrc}
            alt="Minimal concrete and glass residence at dusk"
            fill
            priority
            quality={QUALITY_HERO}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25"
          aria-hidden
        />
      </div>

      <div className="container-forma relative z-10 max-w-4xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
          Moscow · Est. 2019
        </p>
        <AnimatedText
          text="Spaces that breathe with their place."
          className="font-[family-name:var(--font-display)] text-4xl leading-[1.12] text-white md:text-6xl md:leading-[1.1] lg:text-7xl lg:leading-[1.08]"
        />
        <p className="mt-8 max-w-lg text-lg text-white/85 md:text-xl">
          FORMA designs residential and public architecture where material,
          light, and landscape stay in quiet conversation.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center border border-white/40 bg-white/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#1a1a1a]"
          >
            View work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-transparent px-8 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white/90 underline-offset-8 hover:underline"
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
