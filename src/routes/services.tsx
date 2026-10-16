import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Code2, Compass, Globe, Layers, Palette, Rocket, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Software Services — EGenTek builds web apps, AI & full-stack products" },
      { name: "description", content: "EGenTek builds web applications, AI-powered features and full-stack products for startups and businesses — end to end, from idea to deployment." },
      { property: "og:title", content: "Software Services — EGenTek" },
      { property: "og:description", content: "Web apps, AI solutions and full-stack product development, shipped end to end." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: Globe,
    title: "Web App Development",
    text: "Modern, fast and responsive web applications built with React and today's best tooling.",
    points: ["Marketing sites & landing pages", "Dashboards & internal tools", "E-commerce & booking systems"],
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    text: "Practical AI features that save time and make products smarter — not demos that never ship.",
    points: ["Chatbots & AI assistants", "Workflow & document automation", "ML-powered product features"],
  },
  {
    icon: Layers,
    title: "Full-Stack Products",
    text: "Complete product development from database to deployment, maintained after launch.",
    points: ["APIs & databases", "Auth, payments & integrations", "Hosting, monitoring & support"],
  },
];

const process = [
  { icon: Search, title: "Discover", text: "We understand your goal, users and constraints before writing a line of code." },
  { icon: Compass, title: "Design", text: "Wireframes and a clear plan, so you know exactly what you're getting." },
  { icon: Code2, title: "Build", text: "Short development cycles with regular demos and your feedback built in." },
  { icon: Rocket, title: "Launch & Support", text: "We deploy, monitor and keep improving the product after it goes live." },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Software services"
        title="We don't just teach building — we build."
        subtitle="EGenTek is a software company. Our freelancers ship web apps, AI features and full-stack products for real clients — and bring that same craft to every internship."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card-surface card-hover p-8">
              <s.icon className="size-8 text-primary" />
              <h2 className="mt-5 text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-muted-foreground">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="card-surface p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Palette className="size-6 text-primary" />
            <h2 className="text-2xl font-bold">How a project runs</h2>
          </div>
          <p className="mt-2 text-muted-foreground">The same four steps we teach students — applied to your product.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {process.map((p, i) => (
              <div key={p.title} className="rounded-xl border border-border bg-background/50 p-5">
                <div className="flex items-center justify-between">
                  <p.icon className="size-6 text-primary" />
                  <span className="font-display text-2xl font-bold text-muted-foreground/30">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-glow" />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">Have something to build?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Tell us about your idea or product and we'll come back with a plan and a quote.</p>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/contact">Start a project <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
