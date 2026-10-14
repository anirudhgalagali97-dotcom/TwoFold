import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — Twofold",
  description: "What the Twofold free AI audit form collects and how it is used.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" data-section data-index={0} data-tone="cream" className="tone-cream bg-tone min-h-svh pt-[140px] pb-24">
        <article className="container-x flex max-w-[860px] flex-col gap-8">
          <h1 className="t-title">Privacy</h1>
          <p className="t-label text-ink-soft">[Draft: founders to review and replace before launch]</p>

          <section className="flex flex-col gap-3" aria-labelledby="collect">
            <h2 id="collect" className="font-display text-[32px] uppercase">What the audit form collects</h2>
            <p className="t-body text-ink-soft">
              When you request a free AI audit we receive your name, your business name, the type of
              business, your WhatsApp number and, if you add it, your website or Instagram link.
            </p>
          </section>

          <section className="flex flex-col gap-3" aria-labelledby="use">
            <h2 id="use" className="font-display text-[32px] uppercase">How we use it</h2>
            <p className="t-body text-ink-soft">
              We use these details only to prepare your audit and to message you about it on WhatsApp.
              The form sends them to the Twofold founders by email and/or our lead-tracking tool. We do
              not sell your details. [Retention period and any other uses]
            </p>
          </section>

          <section className="flex flex-col gap-3" aria-labelledby="analytics">
            <h2 id="analytics" className="font-display text-[32px] uppercase">Analytics</h2>
            <p className="t-body text-ink-soft">
              This site uses Vercel Web Analytics to count page views. It does not use cookies.
            </p>
          </section>

          <section className="flex flex-col gap-3" aria-labelledby="contact">
            <h2 id="contact" className="font-display text-[32px] uppercase">Questions or removal</h2>
            <p className="t-body text-ink-soft">
              To see or delete the details you sent us, email {site.email} or message us on WhatsApp at{" "}
              {site.whatsapp}.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
