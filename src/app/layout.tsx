import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { brand, contact } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cattleco.farm"),
  title: `${brand.name} | Premium A2 Milk & Natural Dairy Products`,
  description: brand.description,
  openGraph: {
    title: `${brand.name} | Premium A2 Milk & Natural Dairy Products`,
    description: brand.description,
    url: "https://cattleco.farm",
    siteName: brand.name,
    locale: "en_IN",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f3ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0b140f" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: brand.name,
  description: brand.description,
  url: "https://cattleco.farm",
  email: contact.email,
  telephone: contact.phones,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vanaja Farmhouse, Ibbalakahalli",
    addressLocality: "Ramanagara",
    addressRegion: "Karnataka",
    postalCode: "561201",
    addressCountry: "IN",
  },
  areaServed: "Bengaluru",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
