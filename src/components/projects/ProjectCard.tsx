import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import {
  BLUR_DATA_URL,
  QUALITY_CARD,
  SIZES_PROJECT_CARD,
} from "@/lib/image-assets";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="relative overflow-hidden bg-[var(--line)]">
        <div className="relative aspect-[3/4] md:aspect-[4/5]">
          <Image
            src={project.heroImage}
            alt={`${project.title} — ${project.category} architecture`}
            fill
            quality={QUALITY_CARD}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes={SIZES_PROJECT_CARD}
            className="object-cover transition duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 transition group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.14em] text-white/75">
              {project.category} · {project.year}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl md:text-3xl">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-white/80">{project.location}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
