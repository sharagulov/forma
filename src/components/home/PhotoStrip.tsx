"use client";

import Image from "next/image";
import { photoStripImages } from "@/data/photo-strip";
import {
  BLUR_DATA_URL,
  QUALITY_CARD,
  QUALITY_LIGHTBOX,
} from "@/lib/image-assets";

/**
 * Atmosphere: первый кадр — full-bleed почти на весь экран по высоте;
 * остальные 4 — сетка под ним (2×2 на мобиле, 1×4 от sm).
 */
export function PhotoStrip() {
  const [first, ...rest] = photoStripImages;

  return (
    <section className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)] py-0">
      <div className="container-forma pb-8 pt-14 md:pb-10 md:pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
          Atmosphere
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[var(--fg)] md:text-4xl">
          Material and light, in sequence
        </h2>
      </div>

      {/* Первый кадр: на всю ширину вьюпорта, высота как у hero-экрана */}
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <div className="relative h-[min(78vh,920px)] min-h-[320px] w-full overflow-hidden bg-[var(--line)] sm:min-h-[380px] md:h-[min(82vh,960px)]">
          <Image
            src={first.src}
            alt={first.alt}
            fill
            loading="eager"
            priority
            quality={QUALITY_LIGHTBOX}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-forma pb-12 pt-3 md:pb-16 md:pt-4">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
          {rest.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--line)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="eager"
                quality={QUALITY_CARD}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
