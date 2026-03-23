import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  ADDRESS_LINE,
  CITY_LINE,
  CONTACT_EMAIL,
  MAP_COORDS,
  PHONE_DISPLAY,
} from "@/lib/site";
import { BLUR_DATA_URL, QUALITY_CARD } from "@/lib/image-assets";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach FORMA Architects in Moscow — new builds, renovations, and public programmes.",
};

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function ContactPage() {
  const staticMapUrl = mapboxToken
    ? `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+${encodeURIComponent("c4724e")}(${MAP_COORDS.lng},${MAP_COORDS.lat})/${MAP_COORDS.lng},${MAP_COORDS.lat},14,0/1200x600@2x?access_token=${mapboxToken}`
    : null;

  return (
    <main id="main">
      <section className="border-b border-[var(--line)] pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container-forma">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <ScrollReveal>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                Contact
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-[var(--fg)] md:text-6xl">
                Start a conversation
              </h1>
              <p className="mt-6 max-w-md text-[var(--muted)]">
                Share a few lines about your site and timeline. We read every message
                and reply within two business days.
              </p>
              <address className="mt-12 not-italic">
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
            <ScrollReveal delay={80}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="relative aspect-[21/9] min-h-[280px] w-full md:min-h-[400px]">
          {staticMapUrl ? (
            <Image
              src={staticMapUrl}
              alt="Map showing FORMA studio location in Moscow"
              fill
              className="object-cover"
              quality={QUALITY_CARD}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="100vw"
              loading="lazy"
              priority={false}
            />
          ) : (
            <a
              href={`https://www.openstreetmap.org/?mlat=${MAP_COORDS.lat}&mlon=${MAP_COORDS.lng}#map=14/${MAP_COORDS.lat}/${MAP_COORDS.lng}`}
              className="flex h-full w-full items-center justify-center bg-[var(--line)] text-[var(--muted)] transition hover:text-[var(--fg)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-sm">
                View map (OpenStreetMap) — {MAP_COORDS.lat.toFixed(4)}°N,{" "}
                {MAP_COORDS.lng.toFixed(4)}°E
              </span>
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
