import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";
import { CONTACT_EMAIL, FormNotConfiguredError, submitForm } from "@/lib/forms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — EGenTek" },
      { name: "description", content: "Get in touch with the EGenTek team." },
      { property: "og:title", content: "Contact — EGenTek" },
      { property: "og:description", content: "Questions about EGenTek internships? Get in touch." },
    ],
  }),
  component: Contact,
});

const field =
  "mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:border-primary";

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    setStatus("sending");
    try {
      await submitForm("contact", fields);
      setStatus("sent");
    } catch (error) {
      setStatus(error instanceof FormNotConfiguredError ? "unconfigured" : "error");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello"
        subtitle="Questions about our programs or your application? Send us a message."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <div className="card-surface flex gap-4 p-6">
            <Mail className="text-primary" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">{CONTACT_EMAIL}</p>
            </div>
          </div>
          <div className="card-surface flex gap-4 p-6">
            <MapPin className="text-primary" />
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-sm text-muted-foreground">India · Remote-first</p>
            </div>
          </div>
        </div>
        <div className="card-surface p-8">
          {status === "sent" ? (
            <div className="py-16 text-center">
              <h2 className="text-2xl font-bold text-primary">Thanks! We got your message.</h2>
              <p className="mt-2 text-muted-foreground">We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
              <label className="text-sm">
                Full name
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="text-sm">
                Email
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="text-sm sm:col-span-2">
                Message
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background p-3 outline-none focus:border-primary"
                />
              </label>
              {status === "unconfigured" && (
                <p role="status" className="text-sm text-muted-foreground sm:col-span-2">
                  Online messages aren't available yet. Please email us at{" "}
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
                {status === "sending" ? "Sending…" : "Send"}
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
