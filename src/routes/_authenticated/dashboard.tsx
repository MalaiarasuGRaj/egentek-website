import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, FolderKanban, UserRound } from "lucide-react";
import { getMyProfile } from "@/lib/profile.functions";
import { Button } from "@/components/ui/button";

const profileQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: () => getMyProfile(),
});

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — EGenTek" },
      { name: "description", content: "Your EGenTek dashboard: profile, enrolled programs and what to do next." },
      { property: "og:title", content: "Your dashboard — EGenTek" },
      { property: "og:description", content: "Track your profile, programs and progress in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(profileQueryOptions),
  component: Dashboard,
});

function Dashboard() {
  const { data: profile } = useSuspenseQuery(profileQueryOptions);

  const firstName = profile.fullName.trim().split(" ")[0] || "there";
  const filled = [profile.fullName, profile.phone, profile.college, profile.degree, profile.bio].filter(
    (v) => typeof v === "string" && v.trim().length > 0,
  ).length + (profile.graduationYear ? 1 : 0);
  const profileFields = 6;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <header className="animate-rise">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Student dashboard</p>
        <h1 className="mt-3 text-4xl font-bold">
          Welcome, <span className="text-gradient">{firstName}</span>.
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          This is your desk at EGenTek. Everything you enroll in, submit and finish shows up here.
        </p>
        {profile.roles.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.roles.map((r) => (
              <span key={r} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs capitalize text-muted-foreground">
                {r}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="card-surface card-hover p-6">
          <UserRound className="size-6 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">Your profile</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {filled === profileFields
              ? "All set — mentors can see your background and skills."
              : `${filled} of ${profileFields} details added. Mentors use this to give useful feedback.`}
          </p>
          <Button asChild variant="outline" className="mt-5">
            <Link to="/profile">
              {filled === profileFields ? "Edit profile" : "Complete profile"} <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="card-surface card-hover p-6">
          <BookOpen className="size-6 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">Your programs</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You're not enrolled in a program yet. Pick a track, apply, and lessons open up here.
          </p>
          <Button asChild variant="outline" className="mt-5">
            <Link to="/internships">
              Browse internships <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="card-surface card-hover p-6">
          <FolderKanban className="size-6 text-primary" />
          <h2 className="mt-4 text-lg font-semibold">Your projects</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every program ends with a mini-project and a final project. Submitted work and mentor feedback will appear
            here.
          </p>
          <span className="mt-5 inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            Nothing yet
          </span>
        </div>
      </div>

      <section className="mt-12 card-surface p-8">
        <h2 className="text-xl font-semibold">What happens next</h2>
        <ol className="mt-5 space-y-4 text-sm">
          {[
            "Tell us about your background — college, degree, graduation year and the skills you already have.",
            "Apply to a program from the internships page. We review every application by hand.",
            "Once accepted, you'll get batch dates and payment details before your seat is confirmed.",
            "Work through the weekly lessons, quizzes and assignments — your progress saves automatically.",
            "Ship the mini-project and final project, then claim your certificate with a unique ID.",
          ].map((step, i) => (
            <li key={step} className="flex gap-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary font-display text-sm font-bold text-primary">
                {i + 1}
              </span>
              <span className="pt-1 text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
