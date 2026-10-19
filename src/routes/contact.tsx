import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";
import { programs } from "@/lib/programs";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { program?: string | undefined } => ({
    program: typeof s["program"] === "string" ? s["program"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact & Apply — EGenTek" },
      { name: "description", content: "Apply for an EGenTek internship or ask us a question." },
      { property: "og:title", content: "Contact & Apply — EGenTek" },
      {
        property: "og:description",
        content: "Apply for an internship or get in touch with the EGenTek team.",
      },
    ],
  }),
  component: Contact,
});

const field =
  "mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:border-primary";

function Contact() {
  const { program } = Route.useSearch();
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Apply or say hello"
        subtitle="Tell us which program interests you and we'll share the next batch dates and fees."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <div className="card-surface flex gap-4 p-6">
            <Mail className="text-primary" />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">hello@egentek.in</p>
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
          {sent ? (
            <div className="py-16 text-center">
              <h2 className="text-2xl font-bold text-gradient">Thanks! We got your message.</h2>
              <p className="mt-2 text-muted-foreground">We'll get back to you soon.</p>
            </div>
          ) : (
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="text-sm">
                Full name
                <input required className={field} />
              </label>
              <label className="text-sm">
                Email
                <input required type="email" className={field} />
              </label>
              <label className="text-sm">
                College / Institution
                <input className={field} />
              </label>
              <label className="text-sm">
                Program
                <select defaultValue={program ?? ""} className={field}>
                  <option value="">General enquiry</option>
                  {programs.map((p) => (
                    <option key={p.slug}>{p.title}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm sm:col-span-2">
                Message
                <textarea
                  rows={4}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background p-3 outline-none focus:border-primary"
                />
              </label>
              <Button type="submit" variant="hero" size="lg" className="sm:col-span-2">
                Send
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
