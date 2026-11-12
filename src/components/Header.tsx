"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/config/site";
import { Logo } from "./Logo";
import { buttonClass } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes the menu; Tab stays inside it while open; page behind does not scroll
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = [toggleRef.current, ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a,button"))].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    // No backdrop blur while the menu is open: a backdrop filter would trap the fixed menu panel inside the header.
    <header className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${open ? "border-b border-sand-200 bg-sand-50" : scrolled ? "border-b border-sand-200 bg-sand-50/95 shadow-[0_8px_30px_-20px_rgba(15,42,31,0.45)] backdrop-blur-md" : "border-b border-transparent bg-sand-50"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sand-50">
        Skip to content
      </a>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.97rem] font-medium transition-colors ${isActive(item.href) ? "text-ink-900" : "text-muted hover:text-ink-900"} after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-sun-400 after:transition-transform after:duration-300 ${isActive(item.href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/donate" className={buttonClass("gold", "min-h-11 !px-4 text-[0.95rem] sm:!px-5")} aria-current={pathname.startsWith("/donate") ? "page" : undefined}>
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path d="M10 16.5s-6-3.7-6-8.2A3.3 3.3 0 0 1 10 6.4a3.3 3.3 0 0 1 6 1.9c0 4.5-6 8.2-6 8.2z" fill="currentColor" />
            </svg>
            Donate
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-800/20 text-ink-900 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-sand-200 bg-sand-50 lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site py-6">
          <ul className="divide-y divide-sand-200">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center justify-between py-4 font-display text-[1.7rem] ${isActive(item.href) ? "text-ink-900" : "text-ink-800/80"}`}
                >
                  {item.label}
                  {isActive(item.href) && <span className="h-2 w-2 rounded-full bg-sun-400" aria-hidden="true" />}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/transparency" onClick={() => setOpen(false)} className="flex py-4 font-display text-[1.7rem] text-ink-800/80">
                Transparency
              </Link>
            </li>
          </ul>
          <Link href="/donate" onClick={() => setOpen(false)} className={buttonClass("gold", "mt-6 w-full")}>
            Make a Donation
          </Link>
        </nav>
      </div>
    </header>
  );
}
