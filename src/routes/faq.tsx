import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/site-layout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - EGenTek Internships" },
      {
        name: "description",
        content:
          "Answers about EGenTek internships, eligibility, projects, mentors and certificates.",
      },
      { property: "og:title", content: "FAQ - EGenTek" },
      { property: "og:description", content: "Common questions about EGenTek internships." },
    ],
  }),
  component: Faq,
});

const faqs = [
  [
    "Who can join?",
    "Students and beginners from any college or background. Each program lists its prerequisites.",
  ],
  [
    "Are internships online?",
    "Yes. Programs are remote, with self-paced, cohort or hybrid formats.",
  ],
  [
    "What will I build?",
    "Every program follows a four-week learning roadmap, one module a week. You finish with a quiz and a project, both submitted by the end of week four.",
  ],
  [
    "Who reviews my work?",
    "Working freelancers act as mentors and give written feedback on your submissions.",
  ],
  [
    "Do I get a certificate?",
    "Yes. Follow the four-week roadmap, then submit the final quiz and project. You receive your certificate after you submit.",
  ],
  [
    "Do you guarantee a job?",
    "No. We focus on real skills and a strong portfolio — we don't promise placements.",
  ],
];

function Faq() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="Can't find what you need? Reach out through the contact page."
      />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={q} value={`f${i}`} className="card-surface border px-5">
              <AccordionTrigger className="text-left hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
