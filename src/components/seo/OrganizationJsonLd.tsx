import { getSiteUrl, SITE_NAME } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    description:
      "Moscow-based architecture studio — estate, heritage interiors, civic spaces; natural light and durable materials.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Moscow",
      addressCountry: "RU",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
