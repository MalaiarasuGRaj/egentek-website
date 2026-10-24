import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Compass,
  Award,
  MessagesSquare,
  LineChart,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { LeaderQuotes } from "@/components/leader-quotes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EGenTek - Project-based tech internships" },
      {
        name: "description",
        content:
          "Mentor-guided, project-based internships for students. Build real projects, get human feedback, earn a certificate.",
      },
      { property: "og:title", content: "EGenTek - Project-based tech internships" },
      {
        property: "og:description",
        content: "Learn by building real projects with mentors who ship client work every week.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: Compass, title: "Explore", text: "Browse tracks and find what fits your goals." },
  {
    icon: BookOpen,
    title: "Enroll",
    text: "See the full curriculum, duration and requirements upfront.",
  },
  { icon: Code2, title: "Learn", text: "Follow a four-week learning roadmap, one module a week." },
  {
    icon: Award,
    title: "Certify",
    text: "Submit a final quiz and project by the end of week four, then receive your certificate.",
  },
];

const features = [
  {
    icon: MessagesSquare,
    title: "Mentor reviews",
    text: "Every submission gets human feedback from working freelancers.",
  },
  {
    icon: LineChart,
    title: "Progress tracking",
    text: "See exactly where you are and what's next.",
  },
  {
    icon: GitBranch,
    title: "Real workflows",
    text: "Git, code reviews and deployments — like a real team.",
  },
  {
    icon: Award,
    title: "Certificates",
    text: "Finish the quiz and project, submit, and receive your certificate.",
  },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-primary" /> New batches opening soon
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] md:text-6xl">
              Don't just learn tech.
              <br />
              <span className="text-primary">Build with it.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Project-based internships where students learn by shipping real work — guided by
              mentors who do this for a living.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/internships">
                  Explore Internships <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href="#how">How it works</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={hero}
              alt="Students building projects together"
              width={1280}
              height={960}
              className="relative rounded-lg border border-border"
            />
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">How EGenTek works</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="card-surface p-6">
              <div className="flex items-center justify-between">
                <s.icon className="size-7 text-primary" />
                <span className="font-display text-3xl font-bold text-muted-foreground/30">
                  0{i + 1}
                </span>
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
            <h2 className="text-3xl font-bold md:text-4xl">
              Built like a real team,
              <br />
              <span className="text-primary">not a lecture hall.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our mentors are freelancers who ship client work every week. You'll learn the same
              tools, habits and review process they use.
            </p>
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
        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-10 text-center md:p-16">
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-5xl">Your first real project starts here.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Pick a track, see the full plan, and join the next batch.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/internships">
                Find your internship <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
