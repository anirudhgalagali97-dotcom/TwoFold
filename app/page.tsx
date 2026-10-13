import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionCounter from "@/components/SectionCounter";
import { sections } from "@/lib/tokens";

// Phase 1: blank sections in each background tone, to check the header,
// counter and footer. Phase 2 replaces these with the real sections.
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        {sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            data-section
            data-index={i}
            data-tone={s.tone}
            aria-label={s.id}
            className={`tone-${s.tone} bg-tone min-h-svh`}
          />
        ))}
      </main>
      <Footer />
      <SectionCounter />
    </>
  );
}
