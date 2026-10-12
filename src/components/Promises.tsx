import { promises } from "@/content/site";
import { Reveal } from "./ui";
import { icons } from "./icons";

export function Promises() {
  return (
    <section aria-label="Our promises" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
      <ul className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((p, i) => {
          const Icon = icons[p.icon];
          return (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 text-ink">
                <Icon size={22} weight="duotone" />
              </span>
              <div>
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{p.body}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
