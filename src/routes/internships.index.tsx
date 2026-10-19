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
          "Browse EGenTek internships in web, Python, Java, data, AI, design, security, cloud, mobile and marketing.",
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

function Catalog() {
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      programs.filter((p) =>
        (p.title + p.tags.join(" ") + p.tagline).toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [q],
  );

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Find your internship"
        subtitle="Every track includes lessons, weekly tasks, a mini-project, a final project and mentor reviews."
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
          {list.length} program{list.length !== 1 && "s"}
        </p>
        {list.length ? (
          <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProgramCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <div className="card-surface mt-4 p-12 text-center text-muted-foreground">
            No programs match your search yet.
          </div>
        )}
      </section>
    </>
  );
}
