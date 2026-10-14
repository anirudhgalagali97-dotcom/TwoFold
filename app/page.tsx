import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MotionLoader } from "@/components/MotionLoader";
import SectionCounter from "@/components/SectionCounter";
import AiEdge from "@/components/sections/AiEdge";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import HowWeWork from "@/components/sections/HowWeWork";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import ThreeRoot from "@/components/three/ThreeRoot";
import { isPlaceholder, site } from "@/lib/site";

// LocalBusiness / ProfessionalService structured data. Contact fields are
// left out while they are still [placeholders].
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og-image.png`,
  areaServed: { "@type": "City", name: site.city },
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IN" },
  ...(!isPlaceholder(site.phone) && { telephone: site.phone }),
  ...(!isPlaceholder(site.email) && { email: site.email }),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Services />
        <AiEdge />
        <HowWeWork />
        <Work />
        <Contact />
      </main>
      <Footer />
      <SectionCounter />
      <MotionLoader />
      <ThreeRoot />
    </>
  );
}
