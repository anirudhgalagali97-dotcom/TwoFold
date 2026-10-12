import { testimonials } from "@/content/site";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex w-[320px] shrink-0 flex-col justify-between rounded-[28px] bg-surface p-7 ring-1 ring-line sm:w-[400px]">
      <blockquote className="text-lg leading-snug tracking-[-0.01em]">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <span aria-hidden className="grid size-10 place-items-center rounded-full bg-surface-2 font-semibold">
          {t.name.replace("Dr. ", "").charAt(0)}
        </span>
        <span>
          <span className="block font-medium">{t.name}</span>
          <span className="block text-sm text-ink-3">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 id="testimonials-title" className="max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
          What families in Bengaluru say
        </h2>
      </div>
      <div className="marquee relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} aria-hidden={i >= testimonials.length || undefined} className="flex pl-4">
              <Card t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
