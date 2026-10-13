import type { Metadata, Viewport } from "next";
import { Anton, DM_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const dmSans = DM_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Twofold — AI-Powered Marketing for Small Businesses in Bangalore",
  description:
    "Websites, Instagram, ads and an AI receptionist that replies to every customer. Twofold is the AI-powered marketing team for small businesses in Bangalore.",
};

export const viewport: Viewport = {
  themeColor: "#FF5A36",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${anton.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#main"
          className="t-label sr-only z-[60] rounded-full bg-lemon px-6 py-3 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
