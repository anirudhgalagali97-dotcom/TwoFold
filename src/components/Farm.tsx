import { Plant, SunHorizon } from "@phosphor-icons/react/dist/ssr";
import { farm } from "@/content/site";
import { FarmImage } from "./FarmImage";
import { icons } from "./icons";
import { Reveal } from "./ui";

export function Farm() {
  return (
    <section id="farm" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-ink-3">The farm</p>
            <h2 className="mt-5 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">{farm.title}</h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink-2">{farm.body}</p>
            <FarmImage
              src={farm.image}
              alt="Cows grazing at the Cattle Co. farm in Ramanagara"
              className="mt-10 aspect-[16/10] rounded-[20px]"
              fallback={
                <div className="absolute inset-0 bg-pasture text-pasture-ink">
                  <div aria-hidden className="absolute inset-x-[-15%] bottom-[-60%] h-[100%] rounded-[50%] bg-[color-mix(in_oklab,var(--pasture)_75%,black)]" />
                  <SunHorizon aria-hidden size={64} weight="thin" className="absolute right-8 top-7 text-accent" />
                  <Plant aria-hidden size={40} weight="duotone" className="absolute bottom-6 left-7 opacity-60" />
                </div>
              }
            />
          </div>
        </div>

        <ol className="grid gap-4 md:col-span-7">
          {farm.practices.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <Reveal as="li" key={p.title} delay={i * 0.04}>
                <div className="flex gap-6 rounded-[28px] bg-surface p-7 ring-1 ring-line sm:p-9">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-surface-2">
                    <Icon size={28} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.01em] sm:text-2xl">{p.title}</h3>
                    <p className="mt-2 max-w-[48ch] leading-relaxed text-ink-2">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
