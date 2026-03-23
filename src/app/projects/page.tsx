import type { Metadata } from "next";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Estate, heritage interiors, and civic work by FORMA — quiet luxury and context-first architecture.",
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <section className="border-b border-[var(--line)] pb-24 pt-28 md:pb-32 md:pt-36">
        <div className="container-forma">
          <ScrollReveal>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
              Portfolio
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[var(--fg)] md:text-6xl">
              Projects
            </h1>
            <p className="my-6 max-w-2xl text-lg text-[var(--muted)]">
              Estates and grounds, heritage interiors, and civic rooms — one
              line of taste: restraint, lineage, and light held carefully.
            </p>
          </ScrollReveal>
          <ProjectsView />
        </div>
      </section>
    </main>
  );
}
