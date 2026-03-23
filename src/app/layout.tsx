import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { MotionShell } from "@/components/providers/MotionShell";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = getSiteUrl();
const ogImage =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=630&fit=crop&q=80";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Architecture Studio`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "FORMA is a Moscow-based studio for estate, heritage interior, and civic work — natural light, durable materials, quiet luxury.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Architecture Studio`,
    description:
      "Estate, heritage interior, and civic architecture — light, material honesty, context.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "FORMA project facade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Architecture Studio`,
    description:
      "Estate, heritage interior, and civic architecture — light, material honesty, context.",
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={playfair.variable} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
        />
        <style>{`:root { --font-general: "General Sans", system-ui, sans-serif; }`}</style>
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased">
        <OrganizationJsonLd />
        <MotionShell>
          <Navigation />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </MotionShell>
      </body>
    </html>
  );
}
