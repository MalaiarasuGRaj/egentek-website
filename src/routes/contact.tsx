import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";
import { getProgram } from "@/lib/programs";
import { APPLY_FORM_URL } from "@/lib/apply";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { program?: string | undefined } => ({
    program: typeof s["program"] === "string" ? s["program"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact - EGenTek" },
      {
        name: "description",
        content: "Get in touch with the EGenTek team for internship inquiries and questions.",
      },
      { property: "og:title", content: "Contact - EGenTek" },
      {
        property: "og:description",
        content: "Get in touch with the EGenTek team for internship inquiries and questions.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { program: programSlug } = Route.useSearch();
  const selectedProgram = programSlug ? getProgram(programSlug) : undefined;
  const [copied, setCopied] = useState(false);

  const email = "official.egentek@gmail.com";
  const mailSubject = selectedProgram
    ? `Inquiry about ${selectedProgram.title} Internship`
    : "Inquiry about EGenTek Internships";
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(mailSubject)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Have questions about our internship programs, batch schedules, or mentorship? We're here to help."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        {selectedProgram && (
          <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Inquiring about
              </p>
              <h3 className="text-lg font-bold">{selectedProgram.title} Internship</h3>
              <p className="text-sm text-muted-foreground">{selectedProgram.tagline}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="hero">
                <a href={mailtoUrl}>Email about this program</a>
              </Button>
              <Button asChild size="sm" variant="glass">
                <Link to="/internships/$slug" params={{ slug: selectedProgram.slug }}>
                  View details
                </Link>
              </Button>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {/* Email card */}
          <div className="card-surface flex flex-col justify-between p-6">
            <div>
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <h3 className="text-lg font-bold">Email Us</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                For internship inquiries, batch schedules, verification, and general questions.
              </p>
              <p className="mt-4 font-mono text-sm font-medium text-foreground select-all break-all">
                {email}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Button asChild variant="hero" size="sm">
                <a href={mailtoUrl}>
                  <Mail className="size-4" /> Send email
                </a>
              </Button>
              <Button variant="glass" size="sm" onClick={handleCopyEmail}>
                {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                {copied ? "Copied!" : "Copy email address"}
              </Button>
            </div>
          </div>

          {/* LinkedIn card */}
          <div className="card-surface flex flex-col justify-between p-6">
            <div>
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Linkedin className="size-5" />
              </div>
              <h3 className="text-lg font-bold">LinkedIn</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect with our official company page for batch announcements and updates.
              </p>
              <p className="mt-4 text-sm font-medium text-foreground">EGenTek Official Page</p>
            </div>
            <div className="mt-6">
              <Button asChild variant="hero" size="sm" className="w-full">
                <a href="https://www.linkedin.com/company/egentek" target="_blank" rel="noreferrer">
                  <Linkedin className="size-4" /> Visit LinkedIn{" "}
                  <ExternalLink className="size-3.5 opacity-70" />
                </a>
              </Button>
            </div>
          </div>

          {/* Location & Response card */}
          <div className="card-surface flex flex-col justify-between p-6">
            <div>
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <h3 className="text-lg font-bold">Location & Response</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                India · Remote-first organization.
              </p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 shrink-0 text-primary" />
                  <span>Responses typically within 24–48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 shrink-0 text-primary" />
                  <span>Mentorship & live sessions hosted online</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button asChild variant="glass" size="sm" className="w-full">
                <Link to="/faq">
                  Browse FAQ <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Application guidance banner */}
        <div className="card-surface mt-12 p-8 text-center sm:p-10">
          <h3 className="text-xl font-bold">Looking to join an internship?</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Explore our project-based internship tracks in Data and AI.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/internships">
                Explore Internships <ArrowRight className="size-4" />
              </Link>
            </Button>
            {APPLY_FORM_URL && (
              <Button asChild variant="glass" size="lg">
                <a href={APPLY_FORM_URL} target="_blank" rel="noreferrer">
                  Application Form <ExternalLink className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
