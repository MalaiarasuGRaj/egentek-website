import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";
import { ProgramCard } from "@/components/program-card";
import { matchesProgramSearch } from "@/lib/program-search";
import { programs } from "@/lib/programs";

// Domains in the order they first appear in the programs list.
const domains = [...new Set(programs.map((p) => p.category))];

export const Route = createFileRoute("/internships/")({
  validateSearch: (s: Record<string, unknown>): { domain?: string | undefined } => {
    const domain = s["domain"];
    return {
      domain: typeof domain === "string" && domains.includes(domain) ? domain : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Internship Programs - EGenTek" },
      {
        name: "description",
        content: "Browse EGenTek internships in Data and AI.",
      },
      { property: "og:title", content: "Internship Programs - EGenTek" },
      {
        property: "og:description",
        content: "Find a project-based internship that fits your goals.",
      },
    ],
  }),
  component: Catalog,
});

const chip = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm transition-colors ${
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border hover:border-primary hover:text-primary"
  }`;

function Catalog() {
  const { domain } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");

  const groups = useMemo(
    () =>
      (domain ? [domain] : domains)
        .map((d) => ({
          domain: d,
          items: programs.filter((p) => p.category === d && matchesProgramSearch(p, q)),
        }))
        .filter((g) => g.items.length > 0),
    [domain, q],
  );

  const total = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Find your internship"
        subtitle="Every track is four weeks long. Follow the learning roadmap, submit a final quiz and project, and receive your certificate."
      />
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by skill or tool…"
            aria-label="Search internships"
            className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-11 outline-none focus:border-primary"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div role="group" aria-label="Filter by domain" className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className={chip(!domain)}
            aria-pressed={!domain}
            onClick={() => navigate({ search: {} })}
          >
            All domains
          </button>
          {domains.map((d) => (
            <button
              key={d}
              type="button"
              className={chip(domain === d)}
              aria-pressed={domain === d}
              onClick={() => navigate({ search: { domain: d } })}
            >
              {d}
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          {total} program{total !== 1 && "s"}
        </p>
        {groups.length ? (
          <div className="mt-6 space-y-12">
            {groups.map((g) => (
              <div key={g.domain}>
                <h2 className="text-2xl font-bold">{g.domain}</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {g.items.map((p) => (
                    <ProgramCard key={p.slug} p={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-surface mt-6 flex flex-col items-center gap-4 p-12 text-center text-muted-foreground">
            <p>No programs match your search.</p>
            {q && (
              <Button variant="glass" size="sm" onClick={() => setQ("")}>
                Clear search
              </Button>
            )}
          </div>
        )}
      </section>
    </>
  );
}
