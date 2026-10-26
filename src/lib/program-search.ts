import type { Program } from "@/lib/programs";

/** Splits text into lowercase words, so "Scikit-learn" becomes ["scikit", "learn"]. */
const words = (text: string) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/**
 * True when every word in the query starts a word in the program's domain, title,
 * tagline, tags or outcomes. Word order does not matter, so "python sql" finds
 * the Data Analytics track.
 */
export function matchesProgramSearch(program: Program, query: string): boolean {
  const terms = words(query);
  if (terms.length === 0) return true;

  const haystack = words(
    [program.category, program.title, program.tagline, ...program.tags, ...program.outcomes].join(
      " ",
    ),
  );
  return terms.every((term) => haystack.some((word) => word.startsWith(term)));
}
