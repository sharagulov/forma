import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  BLUR_DATA_URL,
  QUALITY_CARD,
  SIZES_FEATURED,
} from "@/lib/image-assets";

export function FeaturedProjects() {
  return (
    <section className="border-b border-[var(--line)] py-24 md:py-40">
      <div className="container-forma">
        <ScrollReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                Selected work
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--fg)] md:text-5xl">
                Featured projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              All projects
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 80}>
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--line)]">
                  <Image
                    src={p.heroImage}
                    alt={`${p.title} — architectural photography`}
                    fill
                    quality={QUALITY_CARD}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes={SIZES_FEATURED}
                    className="object-cover transition duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs uppercase tracking-[0.14em] text-white/75">
                      {p.category} · {p.year}
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">
                      {p.title}
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
