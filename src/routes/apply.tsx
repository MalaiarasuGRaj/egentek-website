import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";
import { CONTACT_EMAIL, FormNotConfiguredError, submitForm } from "@/lib/forms";
import { programs } from "@/lib/programs";

export const Route = createFileRoute("/apply")({
  validateSearch: (s: Record<string, unknown>): { program?: string | undefined } => ({
    program: typeof s["program"] === "string" ? s["program"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Apply — EGenTek" },
      { name: "description", content: "Apply for an EGenTek project-based internship." },
      { property: "og:title", content: "Apply — EGenTek" },
    ],
  }),
  component: Apply,
});

const domains = [...new Set(programs.map((p) => p.category))];

const field =
  "mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:border-primary";

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

function Apply() {
  const { program } = Route.useSearch();
  const [status, setStatus] = useState<Status>("idle");
  const selected = programs.find((p) => p.slug === program);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    setStatus("sending");
    try {
      await submitForm("application", fields);
      setStatus("sent");
    } catch (error) {
      setStatus(error instanceof FormNotConfiguredError ? "unconfigured" : "error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="Apply for an internship"
        subtitle="Tell us a little about yourself. We'll reply with batch dates and next steps."
      />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="card-surface p-8">
          {status === "sent" ? (
            <div className="py-12 text-center">
              <h2 className="text-2xl font-bold text-primary">Application received</h2>
              <p className="mt-2 text-muted-foreground">We'll be in touch with next steps soon.</p>
            </div>
          ) : (
            <form className="grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
              {selected && (
                <p className="rounded-lg bg-secondary px-4 py-3 text-sm sm:col-span-2">
                  Applying for <span className="font-semibold">{selected.title}</span>
                </p>
              )}
              <label className="text-sm">
                Full name <span className="text-primary">*</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="text-sm">
                Email <span className="text-primary">*</span>
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="text-sm">
                Phone <span className="text-primary">*</span>
                <input name="phone" type="tel" required autoComplete="tel" className={field} />
              </label>
              <label className="text-sm">
                College / institution
                <input name="college" autoComplete="organization" className={field} />
              </label>
              <label className="text-sm">
                Program <span className="text-primary">*</span>
                <select
                  name="program"
                  required
                  defaultValue={selected?.slug ?? ""}
                  className={field}
                >
                  <option value="" disabled>
                    Choose a program
                  </option>
                  {domains.map((domain) => (
                    <optgroup key={domain} label={domain}>
                      {programs
                        .filter((p) => p.category === domain)
                        .map((p) => (
                          <option key={p.slug} value={p.slug}>
                            {p.title}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Current status <span className="text-primary">*</span>
                <select name="status" required defaultValue="" className={field}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Student</option>
                  <option>Recent graduate</option>
                  <option>Working professional</option>
                </select>
              </label>
              <label className="text-sm sm:col-span-2">
                Why do you want to join this program?
                <textarea
                  name="motivation"
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background p-3 outline-none focus:border-primary"
                />
              </label>
              <label className="flex items-start gap-3 text-sm sm:col-span-2">
                <input
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-1 size-4 accent-primary"
                />
                <span>I agree that EGenTek may contact me about this application.</span>
              </label>
              {status === "unconfigured" && (
                <p role="status" className="text-sm text-muted-foreground sm:col-span-2">
                  Online applications aren't available yet. Please email your application to{" "}
                  <a className="text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}
              {status === "error" && (
                <p role="status" className="text-sm text-destructive sm:col-span-2">
                  Something went wrong. Please try again, or email {CONTACT_EMAIL}.
                </p>
              )}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="sm:col-span-2"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Submitting…" : "Submit application"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
