import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import ServiceCard, { type Service } from "@/components/ServiceCard";

const services: Service[] = [
  {
    title: "Get online",
    line: "A fast website, a Google profile people trust, and AI chat that answers visitors 24/7.",
    features: ["Website built in-house", "Google Business profile", "AI website chat"],
    scene: "service-online",
  },
  {
    title: "Get customers",
    line: "Instagram, content and ads that bring the right people to your door.",
    features: [
      "Everything in Get Online",
      "Instagram + AI-assisted content",
      "Meta and Google ads",
      "Monthly report",
    ],
    scene: "service-customers",
  },
  {
    title: "AI business assistant",
    line: "An AI receptionist that replies, books and follows up, even at 11 pm.",
    features: [
      "Everything in Get Customers",
      "WhatsApp AI receptionist",
      "Automatic follow-ups and review requests",
      "Live results dashboard",
    ],
    scene: "service-assistant",
    signature: true,
  },
];

export default function Services() {
  return (
    <Section id="services" labelledBy="services-title" className="py-24 lg:py-40">
      <div className="container-x flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <Eyebrow index={3}>Services</Eyebrow>
          <h2 id="services-title" className="t-title" data-reveal>
            What we build
          </h2>
        </div>
        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </Section>
  );
}
