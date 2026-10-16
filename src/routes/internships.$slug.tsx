import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Clock, Layers, Monitor, Timer } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/program-card";
import { formatPrice, getProgram, programs } from "@/lib/programs";

export const Route = createFileRoute("/internships/$slug")({
  loader: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.program;
    const title = p ? `${p.title} Internship — EGenTek` : "Program unavailable — EGenTek";
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
      <Link to="/internships" className="mt-4 inline-block text-primary">Back to internships</Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { program: p } = Route.useLoaderData();
  const related = programs.filter((x) => x.slug !== p.slug && x.level === p.level).slice(0, 3);
  const stats = [
    { icon: Clock, label: "Duration", value: `${p.weeks} weeks` },
    { icon: Timer, label: "Weekly effort", value: `${p.hoursPerWeek} hrs` },
    { icon: Layers, label: "Level", value: p.level },
    { icon: Monitor, label: "Format", value: p.format },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 animate-rise">
          <Link to="/internships" className="text-sm text-muted-foreground hover:text-foreground">← All internships</Link>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">{p.category}</p>
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
                <li key={o} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-primary" />{o}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Curriculum</h2>
            <Accordion type="multiple" defaultValue={["m0"]} className="mt-5 space-y-3">
              {p.modules.map((m, i) => (
                <AccordionItem key={m.title} value={`m${i}`} className="card-surface border px-5">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span><span className="mr-3 text-primary">Module {i + 1}</span>{m.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {m.lessons.map((l, j) => <li key={l}>{i + 1}.{j + 1} · {l}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface p-6">
              <p className="text-xs uppercase tracking-widest text-primary">Mini-project</p>
              <p className="mt-2">{p.miniProject}</p>
            </div>
            <div className="card-surface p-6">
              <p className="text-xs uppercase tracking-widest text-primary">Final project</p>
              <p className="mt-2">{p.finalProject}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Certificate requirements</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Complete all modules and weekly tasks</li>
              <li>• Pass module quizzes</li>
              <li>• Mini-project and final project approved by a mentor</li>
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6 shadow-glow">
            <h3 className="text-lg font-semibold">Ready to start?</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">{formatPrice(p.price)}</span>
              <span className="text-sm text-muted-foreground">one-time program fee</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Prerequisites: {p.prerequisites.join(", ")}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => <span key={t} className="rounded-md border border-border px-2 py-0.5 text-xs">{t}</span>)}
            </div>
            <Button asChild variant="hero" size="lg" className="mt-6 w-full">
              <Link to="/contact" search={{ program: p.title }}>Apply Now</Link>
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">We'll reply with batch dates and fees.</p>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <h2 className="text-2xl font-bold">Related programs</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => <ProgramCard key={r.slug} p={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
