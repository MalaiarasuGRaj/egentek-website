import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Program } from "@/lib/programs";

export function ProgramCard({ p }: { p: Program }) {
  return (
    <div className="card-surface card-hover group relative flex flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs text-primary">
          {p.category}
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <h3 className="mt-5 text-xl font-semibold">
        <Link
          to="/internships/$slug"
          params={{ slug: p.slug }}
          className="after:absolute after:inset-0"
        >
          {p.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.tagline}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" />
          {p.weeks} weeks
        </span>
        <span className="flex items-center gap-1">
          <Layers className="size-3.5" />
          {p.level}
        </span>
        <Button asChild size="sm" className="relative z-10 ml-auto">
          <Link to="/contact" search={{ program: p.title }}>
            Apply
          </Link>
        </Button>
      </div>
    </div>
  );
}
