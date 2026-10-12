import { ArrowUpRight, CalendarDots } from "@phosphor-icons/react/dist/ssr";
import { products, type Product } from "@/content/site";
import { Reveal } from "./ui";

type Tone = "pasture" | "surface" | "muted" | "accent";

const tones: Record<Tone, { card: string; sub: string; chip: string }> = {
  pasture: { card: "bg-pasture text-pasture-ink", sub: "text-pasture-ink/75", chip: "bg-pasture-ink/10" },
  surface: { card: "bg-surface text-ink ring-1 ring-line", sub: "text-ink-2", chip: "bg-surface-2" },
  muted: { card: "bg-surface-2 text-ink", sub: "text-ink-2", chip: "bg-surface" },
  accent: { card: "bg-accent text-accent-ink", sub: "text-accent-ink/80", chip: "bg-accent-ink/10" },
};

function ProductCard({ p, tone, layout, cta }: { p: Product; tone: Tone; layout: "tall" | "wide" | "small"; cta: { label: string; href: string } }) {
  const t = tones[tone];
  const external = cta.href.startsWith("http");
  return (
    <article className={`group relative flex h-full overflow-hidden rounded-[28px] ${t.card} ${layout === "wide" ? "flex-col sm:flex-row" : "flex-col"}`}>
      <div
        className={`relative m-2 overflow-hidden rounded-[20px] ${
          layout === "tall"
            ? "aspect-square md:aspect-auto md:min-h-[420px] md:flex-1"
            : layout === "wide"
              ? "aspect-square sm:order-2 sm:w-[40%] sm:shrink-0"
              : "aspect-[4/3]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={`${p.name} by Cattle Co.`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${p.id === "milk" ? "object-top" : ""} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]`}
        />
      </div>
      <div className={`flex flex-col p-7 pt-5 ${layout === "tall" ? "" : "flex-1"} ${layout === "wide" ? "justify-center sm:pt-7" : ""}`}>
        {p.note && (
          <span className={`mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm ${t.chip}`}>
            <CalendarDots size={16} /> {p.note}
          </span>
        )}
        <h3 className={`font-semibold tracking-[-0.02em] ${layout === "tall" ? "text-3xl md:text-4xl" : "text-2xl"}`}>{p.name}</h3>
        <p className={`mt-2 max-w-[42ch] text-[15px] leading-relaxed ${t.sub}`}>{p.body}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <p className="font-medium">{p.price}</p>
          <a
            href={cta.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ring-1 ring-inset ring-current/25 transition-colors hover:bg-current/10"
          >
            {cta.label} <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Products() {
  const [milk, ghee, paneer, curd] = products;
  return (
    <section id="products" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
      <Reveal>
        <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">From our herd to your kitchen</h2>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-4 md:grid-rows-[auto_auto]">
        <Reveal className="md:col-span-2 md:row-span-2">
          <ProductCard p={milk} tone="pasture" layout="tall" cta={{ label: "Subscribe", href: "#subscribe" }} />
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-2">
          <ProductCard p={ghee} tone="muted" layout="wide" cta={{ label: "Order", href: ghee.href }} />
        </Reveal>
        <Reveal delay={0.12}>
          <ProductCard p={paneer} tone="surface" layout="small" cta={{ label: "Order", href: paneer.href }} />
        </Reveal>
        <Reveal delay={0.18}>
          <ProductCard p={curd} tone="accent" layout="small" cta={{ label: "Order", href: curd.href }} />
        </Reveal>
      </div>
    </section>
  );
}
