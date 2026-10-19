import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/components/site-layout";
import { ProgramCard } from "@/components/program-card";
import { programs } from "@/lib/programs";

export const Route = createFileRoute("/internships/")({
  head: () => ({
    meta: [
      { title: "Internship Programs — EGenTek" },
      {
        name: "description",
        content:
          "Browse EGenTek internships in web development, data, AI, mobile, cybersecurity, cloud, programming, design and marketing.",
      },
      { property: "og:title", content: "Internship Programs — EGenTek" },
      {
        property: "og:description",
        content: "Find a project-based internship that fits your goals.",
      },
    ],
  }),
  component: Catalog,
});

// Domains in the order they first appear in the programs list.
const domains = [...new Set(programs.map((p) => p.category))];

function Catalog() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const groups = useMemo(
    () =>
      domains
        .map((domain) => ({
          domain,
          items: programs.filter(
            (p) =>
              p.category === domain &&
              (p.title + p.tags.join(" ") + p.tagline).toLowerCase().includes(query),
          ),
        }))
        .filter((g) => g.items.length > 0),
    [query],
  );

  const total = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Find your internship"
        subtitle="Every track is four weeks long and includes lessons, weekly tasks, a mini-project, a final project and mentor reviews."
      />
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by skill or tool…"
            aria-label="Search internships"
            className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 outline-none focus:border-primary"
          />
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
          <div className="card-surface mt-6 p-12 text-center text-muted-foreground">
            No programs match your search yet.
          </div>
        )}
      </section>
    </>
  );
}
