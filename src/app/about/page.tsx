import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BLUR_DATA_URL, QUALITY_CARD } from "@/lib/image-assets";

export const metadata: Metadata = {
  title: "About",
  description:
    "FORMA Architects — team, philosophy, and milestones since 2019. Moscow-based practice.",
};

/** Портреты: `public/images/team/01.png` … `04.png` */
const team = [
  {
    name: "Elena Volkov",
    role: "Founding Principal",
    bio: "Trained in Moscow and Zurich, Elena leads concept and client dialogue — from first sketch to site supervision.",
    image: "/images/team/01.png",
  },
  {
    name: "Marcus Ilyin",
    role: "Co-founder, Interiors",
    bio: "Interior atmosphere and bespoke fixtures — Marcus bridges architecture and lived comfort.",
    image: "/images/team/02.png",
  },
  {
    name: "Sofia Orlova",
    role: "Project Architect",
    bio: "Technical design and envelope performance across residential and civic work.",
    image: "/images/team/03.png",
  },
  {
    name: "David Chen",
    role: "Project Architect",
    bio: "Spatial planning, accessibility, and coordination with engineers on complex sites.",
    image: "/images/team/04.png",
  },
];

const milestones = [
  { year: "2019", text: "FORMA founded in Moscow; first residential commissions." },
  { year: "2020", text: "Public pavilion completed; practice adopts integrated interior workflow." },
  { year: "2022", text: "Mountain retreat and coastal projects expand the portfolio." },
  { year: "2024", text: "Civic library and large-format residential work in Kazan and Sochi." },
  { year: "2026", text: "Studio grows to six; continued focus on light, material, and landscape." },
];

const awards = [
  { title: "European Architecture Prize", detail: "Shortlist, Public Building, 2024" },
  { title: "ArchDaily Building of the Year", detail: "Honourable mention, Interior, 2025" },
  { title: "Green Building Council Russia", detail: "Recognition, Adaptive reuse, 2023" },
  { title: "World Architecture Festival", detail: "Display, Future Project, 2022" },
];

export default function AboutPage() {
  return (
    <main id="main">
      <section className="border-b border-[var(--line)] pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container-forma">
          <ScrollReveal>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
              Studio
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[var(--fg)] md:text-6xl">
              About FORMA
            </h1>
          </ScrollReveal>

          <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
            <ScrollReveal>
              <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--fg)] md:text-4xl">
                We design spaces that breathe with their place.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <div className="space-y-6 text-lg leading-relaxed text-[var(--muted)]">
                <p>
                  FORMA — we shape spaces people return to. Founded in 2019, the studio
                  unites architecture, interior atmosphere, and landscape into one calm
                  whole — without noise or excess.
                </p>
                <p>
                  Every brief begins with a simple question: how does this site breathe?
                  From there, structure, light, and material follow in order. We favour
                  durable envelopes, generous daylight, and materials that age with dignity.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-forma">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--fg)] md:text-4xl">
              Team
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--muted)]">
              Architecture, interiors, and visualization — one shared standard of care.
            </p>
          </ScrollReveal>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 50}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--line)]">
                  <Image
                    src={m.image}
                    alt={`Portrait — ${m.name}`}
                    fill
                    quality={QUALITY_CARD}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 font-medium text-[var(--fg)]">{m.name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                  {m.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{m.bio}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)] py-20 md:py-28">
        <div className="container-forma">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--fg)] md:text-4xl">
              Milestones
            </h2>
          </ScrollReveal>
          <ol className="mt-12 space-y-10 border-l border-[var(--line)] pl-8">
            {milestones.map((ms, i) => (
              <ScrollReveal key={ms.year} delay={i * 40}>
                <li className="relative">
                  <span className="absolute -left-[38px] top-1 h-3 w-3 rounded-full bg-[var(--accent)]" />
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
                    {ms.year}
                  </p>
                  <p className="mt-2 max-w-2xl text-[var(--fg)]">{ms.text}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-forma">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--fg)] md:text-4xl">
              Recognition
            </h2>
          </ScrollReveal>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {awards.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 50}>
                <li className="border border-[var(--line)] p-8">
                  <p className="font-[family-name:var(--font-display)] text-xl text-[var(--fg)]">
                    {a.title}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{a.detail}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
