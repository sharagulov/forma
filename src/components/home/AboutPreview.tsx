import Link from "next/link";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function AboutPreview() {
  return (
    <section className="py-24 md:py-40">
      <div className="container-forma grid gap-16 md:grid-cols-2 md:gap-24">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            Studio
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--fg)] md:text-5xl">
            We shape places people return to.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="space-y-6 text-lg leading-relaxed text-[var(--muted)]">
            <p>
              FORMA is a Moscow-based practice founded in 2019. We connect
              architecture, interior atmosphere, and landscape into one calm
              whole — without noise or excess.
            </p>
            <p>
              Every brief begins with a simple question: how does this site
              breathe? From there, structure, light, and material follow in
              order.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-10">
            <div>
              <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--fg)]">
                12
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                Projects
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--fg)]">
                6
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                Years
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--fg)]">
                4
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                Awards
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="mt-10 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            About the studio
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
