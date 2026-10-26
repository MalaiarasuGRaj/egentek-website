import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";
import { ACTIVE_DOMAINS, programs, weeklyHours } from "@/lib/programs";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently asked questions - EGenTek" },
      {
        name: "description",
        content:
          "Answers about EGenTek internships, eligibility, projects, mentors and certificates.",
      },
      { property: "og:title", content: "Frequently asked questions - EGenTek" },
      { property: "og:description", content: "Common questions about EGenTek internships." },
    ],
    // FAQPage structured data lets search engines show these answers in results.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqGroups
            .flatMap((group) => group.items)
            .map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
        }),
      },
    ],
  }),
  component: Faq,
});

const domains = new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(
  ACTIVE_DOMAINS,
);

const faqGroups = [
  {
    title: "Programs and eligibility",
    items: [
      {
        question: "Who can join?",
        answer:
          "Students and beginners from any college or background. Each program lists its prerequisites.",
      },
      {
        question: "Are internships online?",
        answer: "Yes. Programs are remote, with self-paced, cohort or hybrid formats.",
      },
      {
        question: "Which tracks are available?",
        answer: `We currently offer ${programs.length} tracks in ${domains}. Each track runs for four weeks.`,
      },
      {
        question: "How much time does a program take?",
        answer: `Every program runs for four weeks, with ${weeklyHours.min} to ${weeklyHours.max} hours of work per week, depending on the track.`,
      },
    ],
  },
  {
    title: "Learning, certification and outcomes",
    items: [
      {
        question: "What will I build?",
        answer:
          "Every program follows a four-week learning roadmap, one module a week. You finish with a quiz and a project, both submitted by the end of week four.",
      },
      {
        question: "Who reviews my work?",
        answer: "Industry experts act as mentors and give written feedback on your submissions.",
      },
      {
        question: "Do I get a certificate?",
        answer:
          "Yes. Follow the four-week roadmap, then submit the final quiz and project. You receive your certificate after you submit.",
      },
      {
        question: "Do you guarantee a job?",
        answer: "No. We focus on real skills and a strong portfolio — we don't promise placements.",
      },
    ],
  },
  {
    title: "Applying and support",
    items: [
      {
        question: "How do I apply?",
        answer:
          "Browse the internship tracks and select Apply on the one you want. The application form opens from there.",
      },
      {
        question: "How do I get help?",
        answer:
          "Mentors give written feedback on your submissions. For anything else, email us or message our LinkedIn page. We typically reply within 24 to 48 hours.",
      },
    ],
  },
];

function Faq() {
  return (
    <>
      <PageHero
        align="start"
        eyebrow="Support"
        title="Frequently asked questions"
        subtitle="Answers about programs, eligibility, learning, certificates and applying."
      />

      <section className="mx-auto max-w-4xl space-y-14 px-5 py-16">
        {faqGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xl font-bold">{group.title}</h2>
            <Accordion type="single" collapsible className="card-surface mt-5 overflow-hidden">
              {group.items.map((item) => (
                <AccordionItem
                  key={item.question}
                  value={item.question}
                  className="px-6 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-base font-semibold hover:text-primary hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24">
        <div className="card-surface flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-xl font-bold">Still have a question?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Send us a message. Our team typically replies within 24 to 48 hours.
            </p>
          </div>
          <Button asChild variant="hero" className="shrink-0">
            <Link to="/contact">
              Contact us <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
