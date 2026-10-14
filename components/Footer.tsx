import Link from "next/link";
import Logo from "@/components/Logo";
import { navLinks } from "@/lib/tokens";

export default function Footer() {
  return (
    <footer className="tone-ink bg-tone">
      <div className="container-x flex flex-col gap-10 py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/#hero" aria-label="Twofold, back to top" className="inline-flex min-h-11 w-fit items-center">
              <Logo tone="ink" />
            </Link>
            <p className="t-body max-w-md text-cream-soft">
              The AI-powered marketing team for small businesses.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={`/${link.href}`}
                    className="t-label inline-flex min-h-11 items-center underline-offset-8 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream-soft/30 pt-6">
          <p className="t-label text-cream-soft">© 2026 Twofold</p>
          <Link
            href="/privacy"
            className="t-label inline-flex min-h-11 items-center text-cream-soft underline-offset-8 hover:text-cream hover:underline"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
