import { Cow } from "@phosphor-icons/react/dist/ssr";
import { breeds } from "@/content/site";
import { FarmImage } from "./FarmImage";
import { Reveal } from "./ui";

function BreedFallback({ name, tone }: { name: string; tone: "pasture" | "surface" }) {
  const dark = tone === "pasture";
  return (
    <div className={`absolute inset-0 ${dark ? "bg-pasture text-pasture-ink" : "bg-surface-3 text-ink"}`}>
      <Cow aria-hidden size={dark ? 220 : 120} weight="light" className={`absolute ${dark ? "right-6 bottom-5 size-28 opacity-20 sm:size-56" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"}`} />
      {dark && (
        <span aria-hidden className="absolute left-7 top-5 text-[6rem] font-semibold leading-none tracking-[-0.05em] opacity-[0.12] sm:text-[9rem]">
          {name}
        </span>
      )}
    </div>
  );
}

export function Herd() {
  const [gir, ...rest] = breeds;
  return (
    <section id="herd" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
      <Reveal>
        <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
          Three native breeds. One herd.
        </h2>
      </Reveal>
      <Reveal delay={0.05} className="mt-5 max-w-[60ch]">
        <p className="text-lg leading-relaxed text-ink-2">
          Cattle Co. began out of a passion for preserving India&rsquo;s indigenous cattle heritage. Our milk comes only from desi cows.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-5 md:grid-rows-2">
        <Reveal className="md:col-span-3 md:row-span-2">
          <article className="flex h-full flex-col overflow-hidden rounded-[28px] bg-surface ring-1 ring-line">
            <FarmImage
              src={gir.image}
              alt={`${gir.name} cow at the Cattle Co. farm`}
              className="aspect-[4/3] md:aspect-auto md:min-h-[360px] md:flex-1"
              fallback={<BreedFallback name={gir.name} tone="pasture" />}
            />
            <div className="flex flex-col gap-2 p-7 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div>
                <h3 className="text-3xl font-semibold tracking-[-0.02em]">{gir.name}</h3>
                <p className="mt-1 text-sm text-ink-3">{gir.origin}</p>
              </div>
              <p className="max-w-[40ch] text-[15px] leading-relaxed text-ink-2">{gir.body}</p>
            </div>
          </article>
        </Reveal>
        {rest.map((b, i) => (
          <Reveal key={b.name} delay={0.08 * (i + 1)} className="md:col-span-2">
            <article className="grid h-full grid-cols-5 overflow-hidden rounded-[28px] bg-surface ring-1 ring-line">
              <FarmImage
                src={b.image}
                alt={`${b.name} cow at the Cattle Co. farm`}
                className="col-span-2 min-h-[220px]"
                fallback={<BreedFallback name={b.name} tone="surface" />}
              />
              <div className="col-span-3 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{b.name}</h3>
                <p className="mt-1 text-sm text-ink-3">{b.origin}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{b.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
