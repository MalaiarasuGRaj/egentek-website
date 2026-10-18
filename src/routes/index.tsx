import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Code2, Compass, Award, MessagesSquare, LineChart, GitBranch, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/program-card";
import { categories, programs } from "@/lib/programs";
import hero from "@/assets/hero.jpg";
import { LeaderQuotes } from "@/components/leader-quotes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EGenTek — Project-based tech internships" },
      { name: "description", content: "Mentor-guided, project-based internships for students. Build real projects, get human feedback, earn a verifiable certificate." },
      { property: "og:title", content: "EGenTek — Project-based tech internships" },
      { property: "og:description", content: "Learn by building real projects with mentors who ship client work every week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: Compass, title: "Explore", text: "Browse tracks and find what fits your goals." },
  { icon: BookOpen, title: "Enroll", text: "See the full curriculum, duration and requirements upfront." },
  { icon: Code2, title: "Learn", text: "Short lessons, quizzes and hands-on tasks each week." },
  { icon: Rocket, title: "Build", text: "Ship a mini-project and a final project for your portfolio." },
];

const features = [
  { icon: MessagesSquare, title: "Mentor reviews", text: "Every submission gets human feedback from working freelancers." },
  { icon: LineChart, title: "Progress tracking", text: "See exactly where you are and what's next." },
  { icon: GitBranch, title: "Real workflows", text: "Git, code reviews and deployments — like a real team." },
  { icon: Award, title: "Verifiable certificates", text: "Each certificate has a unique ID anyone can verify." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" /> New batches opening soon
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Don't just learn tech.<br />
              <span className="text-gradient">Build with it.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Project-based internships where students learn by shipping real work — guided by mentors who do this for a living.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/internships">Explore Internships <ArrowRight /></Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href="#how">How it works</a>
              </Button>
            </div>
          </div>
          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="absolute -inset-4 rounded-3xl bg-brand opacity-20 blur-3xl" />
            <img src={hero} alt="Students building projects together" width={1280} height={960} className="relative rounded-3xl border border-border" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">Browse by interest</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <Link key={c} to="/internships" search={{ category: c }} className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary">
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Featured internships</h2>
            <p className="mt-2 text-muted-foreground">Structured tracks with a clear finish line.</p>
          </div>
          <Link to="/internships" className="hidden text-sm text-primary hover:underline sm:block">View all →</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 6).map((p) => <ProgramCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">How EGenTek works</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card-surface p-6">
              <div className="flex items-center justify-between">
                <s.icon className="size-7 text-primary" />
                <span className="font-display text-3xl font-bold text-muted-foreground/30">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Built like a real team,<br /><span className="text-gradient">not a lecture hall.</span></h2>
            <p className="mt-4 text-muted-foreground">Our mentors are freelancers who ship client work every week. You'll learn the same tools, habits and review process they use.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="card-surface card-hover p-5">
                <f.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeaderQuotes />

      <section className="mx-auto max-w-7xl px-5 pt-20 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-glow" />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-5xl">Your first real project starts here.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Pick a track, see the full plan, and join the next batch.</p>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/internships">Find your internship <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
