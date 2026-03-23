"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BLUR_DATA_URL,
  QUALITY_GALLERY_THUMB,
  QUALITY_LIGHTBOX,
  SIZES_GALLERY_GRID,
  SIZES_LIGHTBOX,
} from "@/lib/image-assets";

function IconClose({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function IconChevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

export function ProjectGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(null), []);

  const goPrev = useCallback(() => {
    setOpen((i) =>
      i === null ? i : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setOpen((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  const modalOpen = open !== null;

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, goNext, goPrev, modalOpen]);

  /** Блокировка скролла без дёрганья: компенсация ширины скроллбара + пауза Lenis. Зависим только от modalOpen, не от индекса картинки. */
  useEffect(() => {
    if (!modalOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const gap = window.innerWidth - html.clientWidth;

    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyPad = body.style.paddingRight;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    window.dispatchEvent(new Event("forma:modal-scroll-lock"));

    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      body.style.paddingRight = prevBodyPad;
      window.dispatchEvent(new Event("forma:modal-scroll-unlock"));
    };
  }, [modalOpen]);

  const popup =
    open !== null &&
    mounted &&
    createPortal(
      <div
        className="fixed inset-0 z-[9999]"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} gallery`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/92"
          aria-label="Close"
          onClick={close}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6">
          <div
            className="pointer-events-auto flex w-full max-w-[min(96vw,1400px)] flex-col items-center gap-3 sm:gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white transition hover:bg-white/15"
                aria-label="Close"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            <div className="relative h-[min(72vh,820px)] w-full max-h-[80vh] bg-black">
              <Image
                src={images[open]!}
                alt={`${title} — ${open + 1} / ${images.length}`}
                fill
                className="object-contain object-center"
                quality={QUALITY_LIGHTBOX}
                placeholder="empty"
                sizes={SIZES_LIGHTBOX}
                priority
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white transition hover:bg-white/20"
                aria-label="Previous"
              >
                <IconChevron dir="left" />
              </button>
              <span className="min-w-[3.5rem] text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white/85">
                {open + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={goNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white transition hover:bg-white/20"
                aria-label="Next"
              >
                <IconChevron dir="right" />
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-[var(--line)] text-left outline-none ring-offset-2 ring-offset-[var(--bg)] transition focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            onClick={() => setOpen(i)}
          >
            <Image
              src={src}
              alt={`${title} gallery image ${i + 1}`}
              fill
              quality={QUALITY_GALLERY_THUMB}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes={SIZES_GALLERY_GRID}
              className="object-cover object-center transition duration-300 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {popup}
    </>
  );
}
