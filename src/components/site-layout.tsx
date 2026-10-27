import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EGenTekMark } from "@/components/egentek-logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/internships", label: "Internships" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight ${className}`}
    >
      <EGenTekMark className="size-8 transition-transform group-hover:scale-105" />
      <span>
        EGen<span className="text-primary">Tek</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild variant="hero" size="sm" className="px-5">
            <Link to="/internships">Get Started</Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-5 py-4 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Mentor-guided, project-based internships where students learn by shipping real work.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="mailto:official.egentek@gmail.com"
                className="hover:text-foreground hover:underline"
              >
                official.egentek@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/egentek-ai-lab"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>India · Remote-first</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EGenTek. All rights reserved.
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = "center",
  actions,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** "start" left-aligns the heading to the site grid, the layout used by corporate pages. */
  align?: "center" | "start";
  actions?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className={
          centered
            ? "relative mx-auto max-w-4xl px-5 py-20 text-center"
            : "mx-auto max-w-6xl px-5 py-20"
        }
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1>
        <p className={`mt-4 max-w-2xl text-muted-foreground ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
