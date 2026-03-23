import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="container-forma flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--fg)]">
            {SITE_NAME}
          </p>
          <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
            Architecture and interiors rooted in light, material honesty, and
            context.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm md:items-end">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[var(--fg)] underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <div className="flex gap-6 text-[var(--muted)]">
            <Link href="/projects" className="hover:text-[var(--fg)]">
              Projects
            </Link>
            <Link href="/about" className="hover:text-[var(--fg)]">
              About
            </Link>
            <Link href="/contact" className="hover:text-[var(--fg)]">
              Contact
            </Link>
          </div>
          <p className="text-xs text-[var(--muted)]">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
