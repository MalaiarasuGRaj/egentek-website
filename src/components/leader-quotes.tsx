import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeaderQuotes } from "@/hooks/use-leader-quotes";
import { QUOTE_ROTATION_MS, sampleLeaderQuotes } from "@/lib/leader-quotes";

export function LeaderQuotes() {
  const { data, isError, isPending } = useLeaderQuotes();
  const samples = !data?.length;
  const quotes = samples ? sampleLeaderQuotes : data;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const foundIndex = quotes.findIndex((quote) => quote.id === activeId);
  const index = foundIndex < 0 ? 0 : foundIndex;
  const current = quotes[index];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || reducedMotion || quotes.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveId((id) => {
        const position = quotes.findIndex((quote) => quote.id === id);
        return quotes[((position < 0 ? 0 : position) + 1) % quotes.length]?.id ?? null;
      });
    }, QUOTE_ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [quotes, paused, hovered, focused, reducedMotion]);

  function move(direction: number) {
    setActiveId(quotes[(index + direction + quotes.length) % quotes.length]?.id ?? null);
  }

  if (!current) return null;

  return (
    <section aria-labelledby="leader-quotes-title" aria-roledescription="carousel" className="border-y border-border bg-secondary/40"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Perspectives on building</p>
            <h2 id="leader-quotes-title" className="text-3xl font-bold md:text-4xl">What leaders are saying</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous quote" title="Previous quote"><ArrowLeft /></Button>
            <Button variant="ghost" size="icon" onClick={() => { setPaused(!paused); setReducedMotion(false); }} aria-label={paused || reducedMotion ? "Play quotes" : "Pause quotes"} title={paused || reducedMotion ? "Play quotes" : "Pause quotes"}>
              {paused || reducedMotion ? <Play /> : <Pause />}
            </Button>
            <Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Next quote" title="Next quote"><ArrowRight /></Button>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-[80px_1fr]">
          <Quote className="size-12 text-primary/40 md:size-16" aria-hidden="true" />
          <div>
            {samples && <p className="mb-4 text-xs font-medium text-muted-foreground">Sample perspectives · Not actual endorsements</p>}
            <figure aria-label={`Quote ${index + 1} of ${quotes.length}`} className="flex min-h-[330px] flex-col justify-between sm:min-h-[270px] md:min-h-[240px]">
              <blockquote className="max-w-4xl text-2xl font-medium leading-relaxed md:text-3xl">“{current.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 font-display font-semibold text-primary">
                  {current.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">{current.name}</p>
                  <p className="text-sm text-muted-foreground">{[current.role, current.company].filter(Boolean).join(" · ")}</p>
                </div>
              </figcaption>
            </figure>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
              <div className="flex flex-wrap gap-1" aria-label="Choose a quote">
                {quotes.map((quote, position) => <Button key={quote.id} variant="ghost" size="icon" className="size-8" onClick={() => setActiveId(quote.id)} aria-label={`Show quote ${position + 1}`} aria-pressed={index === position}>
                  <span className={`h-1.5 w-5 rounded-full ${index === position ? "bg-primary" : "bg-border"}`} />
                </Button>)}
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}</span>
            </div>
            {isError && <p role="status" className="mt-3 text-xs text-muted-foreground">Live quotes are temporarily unavailable.</p>}
            {isPending && <span className="sr-only" role="status">Loading published quotes</span>}
          </div>
        </div>
      </div>
    </section>
  );
}