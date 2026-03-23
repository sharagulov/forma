import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectNav({
  prev,
  next,
}: {
  prev: Project | null;
  next: Project | null;
}) {
  return (
    <nav
      className="mt-20 flex flex-col gap-6 border-t border-[var(--line)] pt-10 md:flex-row md:justify-between"
      aria-label="Adjacent projects"
    >
      <div>
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group block text-[var(--muted)] transition hover:text-[var(--fg)]"
          >
            <span className="text-xs uppercase tracking-[0.14em]">Previous</span>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--fg)] group-hover:text-[var(--accent)]">
              ← {prev.title}
            </p>
          </Link>
        ) : (
          <span className="text-sm text-[var(--muted)]">Previous</span>
        )}
      </div>
      <div className="text-right">
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group block text-[var(--muted)] transition hover:text-[var(--fg)]"
          >
            <span className="text-xs uppercase tracking-[0.14em]">Next</span>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--fg)] group-hover:text-[var(--accent)]">
              {next.title} →
            </p>
          </Link>
        ) : (
          <span className="text-sm text-[var(--muted)]">Next</span>
        )}
      </div>
    </nav>
  );
}
