import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BookOpen, Check, Clock, Layers, Monitor, Timer } from "lucide-react";
import { ApplyButton } from "@/components/apply-button";
import { ProgramCard } from "@/components/program-card";
import { getProgram, programs } from "@/lib/programs";

export const Route = createFileRoute("/internships/$slug")({
  loader: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.program;
    const title = p ? `${p.title} Internship - EGenTek` : "Program unavailable - EGenTek";
    const desc = p?.tagline ?? "This program could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="text-3xl font-bold">Program not found</h1>
      <Link to="/internships" className="mt-4 inline-block text-primary">
        Back to internships
      </Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { program: p } = Route.useLoaderData();
  const related = programs
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, 3);
  const stats = [
    { icon: Clock, label: "Duration", value: `${p.weeks} weeks` },
    { icon: Timer, label: "Weekly effort", value: `${p.hoursPerWeek} hrs` },
    { icon: Layers, label: "Level", value: p.level },
    { icon: Monitor, label: "Format", value: p.format },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative mx-auto max-w-7xl px-5 py-16">
          <Link to="/internships" className="text-sm text-muted-foreground hover:text-foreground">
            ← All internships
          </Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">
            {p.category}
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold md:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{p.tagline}</p>
          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="card-surface p-4">
                <s.icon className="size-4 text-primary" />
                <p className="mt-2 text-xs text-muted-foreground">{s.label}</p>
                <p className="font-semibold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_340px]">
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold">What you'll learn</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Learning modules</h2>
            <div className="card-surface mt-5 flex items-start gap-4 p-6">
              <BookOpen className="mt-1 size-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Curriculum access</h3>
                <p className="mt-1 text-muted-foreground">
                  Once you register and are shortlisted for the internship program, the
                  expert-curated learning modules will be shared.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Final submission</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="card-surface p-6">
                <p className="text-xs uppercase tracking-widest text-primary">Final quiz</p>
                <p className="mt-2 text-muted-foreground">
                  Covers all modules in the program curriculum.
                </p>
              </div>
              <div className="card-surface p-6">
                <p className="text-xs uppercase tracking-widest text-primary">Final project</p>
                <p className="mt-2">{p.finalProject}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">How you earn your certificate</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-muted-foreground">
              <li>Follow the expert-curated learning modules.</li>
              <li>Submit the final quiz and project upon completing the curriculum.</li>
              <li>Receive your certificate after you submit.</li>
            </ol>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6">
            <h3 className="text-lg font-semibold">Ready to start?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Prerequisites: {p.prerequisites.join(", ")}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="rounded-md border border-border px-2 py-0.5 text-xs">
                  {t}
                </span>
              ))}
            </div>
            <ApplyButton label="Apply Now" variant="hero" size="lg" className="mt-6 w-full" />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              We'll reply with batch dates and next steps.
            </p>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <h2 className="text-2xl font-bold">Related programs</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <ProgramCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
