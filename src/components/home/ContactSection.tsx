import Link from "next/link";
import { ADDRESS_LINE, CITY_LINE, CONTACT_EMAIL, PHONE_DISPLAY } from "@/lib/site";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function ContactSection() {
  return (
    <section className="py-24 md:py-40">
      <div className="container-forma grid gap-12 md:grid-cols-2">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            Contact
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[var(--fg)] md:text-5xl">
            Tell us about your site.
          </h2>
          <p className="mt-6 max-w-md text-[var(--muted)]">
            New builds, renovations, and public programmes — we respond within
            two business days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex border border-[var(--line)] bg-[var(--surface)] px-8 py-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Contact form
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <address className="not-italic">
            <dl className="space-y-6 text-[var(--muted)]">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em]">Email</dt>
                <dd className="mt-1 text-lg text-[var(--fg)]">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em]">Phone</dt>
                <dd className="mt-1 text-lg text-[var(--fg)]">{PHONE_DISPLAY}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em]">Studio</dt>
                <dd className="mt-1 text-lg leading-relaxed text-[var(--fg)]">
                  {ADDRESS_LINE}
                  <br />
                  {CITY_LINE}
                </dd>
              </div>
            </dl>
          </address>
        </ScrollReveal>
      </div>
    </section>
  );
}
