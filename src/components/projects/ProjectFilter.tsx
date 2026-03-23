"use client";

import type { ProjectCategory } from "@/data/projects";
import { PROJECT_CATEGORY_ORDER } from "@/data/category-pinterest";
import { cn } from "@/lib/utils";

const options: (ProjectCategory | "All")[] = [
  "All",
  ...PROJECT_CATEGORY_ORDER,
];

export function ProjectFilter({
  value,
  onChange,
}: {
  value: ProjectCategory | "All";
  onChange: (v: ProjectCategory | "All") => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter projects by theme"
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full border px-4 py-2 text-left text-xs font-medium uppercase tracking-[0.08em] transition md:text-[0.7rem]",
            value === opt
              ? "border-[var(--accent)] bg-[var(--accent)] text-white"
              : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]",
          )}
        >
          {opt === "All" ? "All" : opt}
        </button>
      ))}
    </div>
  );
}
