import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionCounter from "@/components/SectionCounter";
import AiEdge from "@/components/sections/AiEdge";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import HowWeWork from "@/components/sections/HowWeWork";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
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
    </>
  );
}
