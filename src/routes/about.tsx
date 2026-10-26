import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Hammer, Heart, Lightbulb, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";
import { programs, weeklyHours } from "@/lib/programs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EGenTek - Designed by industry experts, for students" },
      {
        name: "description",
        content:
          "Why EGenTek exists: practical, project-first internships designed by industry experts.",
      },
      { property: "og:title", content: "About EGenTek" },
      {
        property: "og:description",
        content: "Practical, project-first internships designed by industry experts.",
      },
    ],
  }),
  component: About,
});

const stats = [
  { value: String(programs.length), label: "Active internship tracks" },
  { value: "4", label: "Weeks per program" },
  { value: `${weeklyHours.min}–${weeklyHours.max}`, label: "Hours of work per week" },
];

const pillars = [
  {
    title: "Our mission",
    text: "Give every student a structured, mentor-guided path from learning a skill to shipping real work with it.",
  },
  {
    title: "Our vision",
    text: "A generation of builders who graduate with portfolios, not just transcripts.",
  },
];

const values = [
  {
    icon: Hammer,
    title: "Learning by doing",
    text: "Every concept leads to work you can show: a project, a deliverable or a portfolio entry.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Clear requirements and realistic outcomes. We make no inflated claims and do not promise placements.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity",
    text: "We teach students how to work things out, not just which answers to memorise.",
  },
  {
    icon: Heart,
    title: "Student outcomes",
    text: "Structured feedback from mentors who are invested in each student's progress.",
  },
];

function About() {
  return (
    <>
      <PageHero
        align="start"
        eyebrow="About us"
        title="Closing the gap between college and professional work."
        subtitle="EGenTek was founded by industry experts who saw talented students struggle to show what they could actually build."
        actions={
          <>
            <Button asChild variant="hero" size="lg">
              <Link to="/internships">
                Explore internships <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/contact">Contact us</Link>
            </Button>
          </>
        }
      />

      <section className="border-b border-border bg-secondary/40">
        <dl className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-display text-4xl font-bold text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-2">
        {pillars.map((p) => (
          <div key={p.title} className="card-surface p-8">
            <h2 className="text-2xl font-bold">{p.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold">What we value</h2>
          <p className="mt-3 text-muted-foreground">
            The principles behind every program we design and every mentor we work with.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="card-surface card-hover p-6">
              <v.icon className="size-6 text-primary" />
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-lg border border-border bg-card p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to build your first project?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Explore the tracks, review the four-week plan and choose the one that fits your goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/internships">
                Explore internships <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to="/faq">Read the FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
