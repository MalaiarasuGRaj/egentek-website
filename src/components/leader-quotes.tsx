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
  const quoteSize = current && current.quote.length < 45
    ? "text-4xl sm:text-5xl"
    : current && current.quote.length < 100
      ? "text-3xl sm:text-4xl"
      : "text-2xl sm:text-3xl";

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

  if (!quotes.length && !isPending) return null;
  if (!current) return null;

  return (
    <section aria-labelledby="leader-quotes-title" aria-roledescription="carousel" className="border-y border-border bg-secondary/40"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">The intelligence era</p>
            <h2 id="leader-quotes-title" className="text-3xl font-bold md:text-4xl">AI, in their words</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Previous leader quote" title="Previous leader quote"><ArrowLeft /></Button>
            <Button variant="ghost" size="icon" onClick={() => { setPaused(!paused); setReducedMotion(false); }} aria-label={paused || reducedMotion ? "Play leader quotes" : "Pause leader quotes"} title={paused || reducedMotion ? "Play leader quotes" : "Pause leader quotes"}>
              {paused || reducedMotion ? <Play /> : <Pause />}
            </Button>
            <Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Next leader quote" title="Next leader quote"><ArrowRight /></Button>
          </div>
        </div>
        {samples && <p className="mt-4 text-xs text-muted-foreground">Public quotes · Not EGenTek endorsements</p>}
        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(180px,280px)_1fr]" aria-live="polite">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted sm:aspect-[4/3] md:aspect-auto md:min-h-80 md:max-h-[420px]">
            {current.imageUrl ? <img className="absolute inset-0 size-full object-cover object-center" src={current.imageUrl} alt={`${current.name}`} onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <div className="absolute inset-0 grid place-items-center text-5xl font-semibold text-primary">{current.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>}
          </div>
          <article key={current.id} aria-label={`Leader quote ${index + 1} of ${quotes.length}`} className="flex min-h-56 flex-col justify-between border-l-2 border-primary/50 bg-background p-6 sm:p-8 md:min-h-80 md:p-10">
            <div>
              <Quote className="mb-5 size-8 text-primary/70" aria-hidden="true" />
              <blockquote className={`max-w-3xl font-medium leading-tight ${quoteSize}`}>“{current.quote}”</blockquote>
              {current.description && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{current.description}</p>}
            </div>
            <footer className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
              <div>
                <p className="text-lg font-semibold">{current.name}</p>
                <p className="text-sm text-muted-foreground">{[current.role, current.company].filter(Boolean).join(" · ")}</p>
                <div className="mt-2 flex flex-wrap gap-x-4">
                  {current.sourceUrl && <a className="text-xs text-primary underline-offset-4 hover:underline" href={current.sourceUrl} target="_blank" rel="noreferrer">Quote source</a>}
                  {current.imageSourceUrl && <a className="text-xs text-muted-foreground underline-offset-4 hover:underline" href={current.imageSourceUrl} target="_blank" rel="noreferrer">Photo credit</a>}
                </div>
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}</span>
            </footer>
          </article>
        </div>
        <div className="mt-5 flex justify-center gap-1" aria-label="Choose a leader quote">
          {quotes.map((quote, position) => <Button key={quote.id} variant="ghost" size="icon" className="size-8" onClick={() => setActiveId(quote.id)} aria-label={`Show leader quote ${position + 1}`} aria-pressed={index === position}>
            <span className={`h-1.5 w-5 rounded-full ${index === position ? "bg-primary" : "bg-border"}`} />
          </Button>)}
        </div>
        {isError && <p role="status" className="mt-4 text-xs text-muted-foreground">Live quotes are temporarily unavailable.</p>}
        {isPending && <span className="sr-only" role="status">Loading published quotes</span>}
      </div>
    </section>
  );
}