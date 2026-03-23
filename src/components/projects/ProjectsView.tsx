"use client";

import { useMemo, useState } from "react";
import { projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function ProjectsView() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");

  const list = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <>
      <ScrollReveal>
        <ProjectFilter value={filter} onChange={setFilter} />
      </ScrollReveal>
      <div className="mt-16 columns-1 gap-8 md:columns-2 lg:columns-3">
        {list.map((p, i) => (
          <ScrollReveal key={p.slug} delay={i * 40} className="mb-8 break-inside-avoid">
            <ProjectCard project={p} />
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
