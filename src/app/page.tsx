import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Promises } from "@/components/Promises";
import { Herd } from "@/components/Herd";
import { WhyA2 } from "@/components/WhyA2";
import { Products } from "@/components/Products";
import { Farm } from "@/components/Farm";
import { Journey } from "@/components/Journey";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Subscribe } from "@/components/Subscribe";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Promises />
        <Herd />
        <WhyA2 />
        <Products />
        <Farm />
        <Journey />
        <Testimonials />
        <Faq />
        <Subscribe />
      </main>
      <Footer />
    </>
  );
}
