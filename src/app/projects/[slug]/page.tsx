import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  getAdjacentSlugs,
  getProjectBySlug,
  projects,
} from "@/data/projects";
import { getSiteUrl } from "@/lib/site";
import {
  BLUR_DATA_URL,
  QUALITY_HERO,
} from "@/lib/image-assets";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const url = `${getSiteUrl()}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} · FORMA Architects`,
      description: project.summary,
      url,
      images: [{ url: project.heroImage, width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentSlugs(slug);

  return (
    <main id="main">
      <article>
        <section className="relative min-h-[70vh] overflow-hidden md:min-h-[80vh]">
          <Image
            src={project.heroImage}
            alt={`${project.title} — hero`}
            fill
            priority
            quality={QUALITY_HERO}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 z-10 pb-16 pt-32 md:pb-24">
            <div className="container-forma">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75">
                {project.category} · {project.year}
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-white md:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/85">{project.summary}</p>
            </div>
          </div>
        </section>

        <div className="container-forma py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-24">
            <div>
              <ScrollReveal>
                <div className="space-y-6 text-lg leading-relaxed text-[var(--muted)]">
                  {project.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={80} className="mt-16">
                <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)] md:text-3xl">
                  Gallery
                </h2>
                <div className="mt-8">
                  <ProjectGallery title={project.title} images={project.gallery} />
                </div>
              </ScrollReveal>
            </div>

            <aside className="lg:pt-2">
              <dl className="space-y-6 border border-[var(--line)] bg-[var(--surface)] p-8 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                    Year
                  </dt>
                  <dd className="mt-1 text-[var(--fg)]">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                    Area
                  </dt>
                  <dd className="mt-1 text-[var(--fg)]">{project.area}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                    Location
                  </dt>
                  <dd className="mt-1 text-[var(--fg)]">{project.location}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                    Type
                  </dt>
                  <dd className="mt-1 text-[var(--fg)]">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                    Status
                  </dt>
                  <dd className="mt-1 capitalize text-[var(--fg)]">{project.status}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <nav
            className="mt-20 flex flex-col gap-6 border-t border-[var(--line)] pt-12 sm:flex-row sm:justify-between"
            aria-label="Project navigation"
          >
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group text-[var(--muted)] transition hover:text-[var(--fg)]"
              >
                <span className="text-xs uppercase tracking-[0.14em]">Previous</span>
                <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-[var(--fg)] group-hover:text-[var(--accent)]">
                  ← {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group text-right text-[var(--muted)] transition hover:text-[var(--fg)] sm:ml-auto"
              >
                <span className="text-xs uppercase tracking-[0.14em]">Next</span>
                <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-[var(--fg)] group-hover:text-[var(--accent)]">
                  {next.title} →
                </p>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </article>
    </main>
  );
}
