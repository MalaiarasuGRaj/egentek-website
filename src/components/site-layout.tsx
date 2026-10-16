import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const nav = [
  { to: "/", label: "Home" },
  { to: "/internships", label: "Internships" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
      <span className="grid size-8 place-items-center rounded-lg bg-brand text-primary-foreground">E</span>
      <span>
        EGen<span className="text-gradient">Tek</span>
      </span>
    </Link>
  );
}

// Header affordance driven by the real session, so a signed-in visitor never
// sees a "Sign in" button that bounces them back out.
export function AccountArea({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <div className={compact ? "h-10 rounded-xl bg-secondary/60" : "h-9 w-32 rounded-full bg-secondary/60"} />;
  }

  if (!user) {
    return compact ? (
      <Button asChild variant="hero" className="mt-2 w-full">
        <Link to="/auth" onClick={onNavigate}>Sign in</Link>
      </Button>
    ) : (
      <Button asChild variant="hero" size="sm" className="px-5">
        <Link to="/auth">Sign in</Link>
      </Button>
    );
  }

  const firstName = user.fullName.trim().split(" ")[0] || "you";

  if (compact) {
    return (
      <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
        <span className="px-3 text-xs text-muted-foreground">Signed in as {user.email}</span>
        <Button asChild variant="outline" className="w-full">
          <Link to="/dashboard" onClick={onNavigate}>Dashboard</Link>
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => void signOut()}>
          <LogOut /> Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground xl:inline">Hi, {firstName}</span>
      <Button asChild variant="outline" size="sm">
        <Link to="/dashboard" onClick={onNavigate}>Dashboard</Link>
      </Button>
      <Button variant="ghost" size="sm" onClick={() => void signOut()} aria-label="Sign out">
        <LogOut />
      </Button>
    </div>
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
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-secondary">
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
                <Link to={n.to} className="hover:text-foreground">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@egentek.in</li>
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

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-glow" />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center animate-rise">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>
      </div>
    </section>
  );
}
