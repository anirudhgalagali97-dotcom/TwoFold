import { brand, contact, nav, tel } from "@/content/site";
import { Logo } from "./Nav";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-ink-2">{brand.tagline}, from desi cows raised on our family farm.</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="grid gap-2 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-ink-2 hover:text-ink">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <address className="grid gap-2 text-[15px] not-italic text-ink-2 md:col-span-4">
          {contact.phones.map((p) => (
            <a key={p} href={tel(p)} className="hover:text-ink">{p}</a>
          ))}
          <a href={`mailto:${contact.email}`} className="hover:text-ink">{contact.email}</a>
          <span className="mt-2">{contact.address.join(", ")}</span>
        </address>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-2 px-4 pb-6 text-sm text-ink-3 sm:px-6 lg:px-10">
        <span>© {new Date().getFullYear()} {brand.name} All rights reserved.</span>
        <span>Desi cow A2 dairy, Ramanagara</span>
      </div>
      <p
        aria-hidden
        className="mx-auto max-w-[1400px] select-none overflow-hidden px-4 text-center text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-surface-3 sm:px-6 lg:px-10 xl:text-[300px]"
      >
        Cattle Co.
      </p>
    </footer>
  );
}
