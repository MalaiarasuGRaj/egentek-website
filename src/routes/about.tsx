import { createFileRoute } from "@tanstack/react-router";
import { Hammer, Heart, Lightbulb, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EGenTek — Built by freelancers, for students" },
      { name: "description", content: "Why EGenTek exists: practical, project-first internships led by working freelancers." },
      { property: "og:title", content: "About EGenTek" },
      { property: "og:description", content: "Practical, project-first internships led by working freelancers." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Hammer, title: "Build first", text: "Every concept leads to something you make." },
  { icon: ShieldCheck, title: "Honest promises", text: "Clear fees, clear requirements, no inflated claims." },
  { icon: Lightbulb, title: "Curiosity", text: "We teach how to figure things out, not just answers." },
  { icon: Heart, title: "Student-first", text: "Real feedback from mentors who care about your growth." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="The gap between college and real work is a project." subtitle="EGenTek was started by a group of freelancers who saw talented students struggle to show what they could actually build." />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
        <div className="card-surface p-8">
          <h2 className="text-2xl font-bold text-gradient">Mission</h2>
          <p className="mt-3 text-muted-foreground">Build real software for clients — and give every student a structured, mentor-guided path from learning a skill to shipping real work with it.</p>
        </div>
        <div className="card-surface p-8">
          <h2 className="text-2xl font-bold text-gradient">Vision</h2>
          <p className="mt-3 text-muted-foreground">A generation of builders who graduate with portfolios, not just transcripts.</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-3xl font-bold">What we value</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="card-surface card-hover p-6">
              <v.icon className="size-6 text-primary" />
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
