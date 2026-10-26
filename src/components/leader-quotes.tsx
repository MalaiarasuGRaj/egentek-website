import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUOTE_ROTATION_MS, leaderQuotes } from "@/lib/leader-quotes";

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function LeaderQuotes() {
  const quotes = leaderQuotes;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const paused = hovered || keyboardFocused || reducedMotion;
  const current = quotes[index];

  // Restarts the timer whenever the quote changes, so a manual click gets a full
  // interval before the carousel moves on.
  useEffect(() => {
    if (paused || quotes.length < 2) return;
    const timer = window.setTimeout(() => {
      setIndex((position) => (position + 1) % quotes.length);
    }, QUOTE_ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, quotes.length]);

  function move(direction: number) {
    setIndex((position) => (position + direction + quotes.length) % quotes.length);
  }

  if (!current) return null;
  const quoteSize =
    current.quote.length < 45
      ? "text-4xl sm:text-5xl"
      : current.quote.length < 100
        ? "text-3xl sm:text-4xl"
        : "text-2xl sm:text-3xl";

  return (
    <section
      aria-labelledby="leader-quotes-title"
      aria-roledescription="carousel"
      className="border-y border-border bg-secondary/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (event.target instanceof HTMLElement && event.target.matches(":focus-visible"))
          setKeyboardFocused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setKeyboardFocused(false);
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              The intelligence era
            </p>
            <h2 id="leader-quotes-title" className="text-3xl font-bold md:text-4xl">
              AI, in their words
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => move(-1)}
              aria-label="Previous leader quote"
              title="Previous leader quote"
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => move(1)}
              aria-label="Next leader quote"
              title="Next leader quote"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Public statements from each leader · Not EGenTek endorsements
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(180px,280px)_1fr]">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted md:aspect-auto md:min-h-80 md:max-h-[420px]">
            <div
              className="absolute inset-0 grid place-items-center text-5xl font-semibold text-primary"
              aria-hidden="true"
            >
              {current.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </div>
            <img
              className="absolute inset-0 size-full object-cover object-center"
              src={current.imageUrl}
              alt={current.name}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
          <article
            key={current.id}
            aria-label={`Leader quote ${index + 1} of ${quotes.length}`}
            className="flex min-h-56 flex-col justify-between border-l-2 border-primary/50 bg-background p-6 sm:p-8 md:min-h-80 md:p-10"
          >
            <div>
              <Quote className="mb-5 size-8 text-primary/70" aria-hidden="true" />
              <blockquote className={`max-w-3xl font-medium leading-tight ${quoteSize}`}>
                “{current.quote}”
              </blockquote>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {current.description}
              </p>
            </div>
            <footer className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
              <div>
                <p className="text-lg font-semibold">{current.name}</p>
                <p className="text-sm text-muted-foreground">{current.role}</p>
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
              </span>
            </footer>
          </article>
        </div>
        <div
          className="mt-5 flex justify-center gap-1"
          role="group"
          aria-label="Choose a leader quote"
        >
          {quotes.map((quote, position) => (
            <Button
              key={quote.id}
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setIndex(position)}
              aria-label={`Show ${quote.name}`}
              aria-pressed={index === position}
            >
              <span
                className={`h-1.5 w-5 rounded-full ${index === position ? "bg-primary" : "bg-border"}`}
              />
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
