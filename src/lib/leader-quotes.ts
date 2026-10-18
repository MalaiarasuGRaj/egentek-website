export type LeaderQuote = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

// Explicit preview content, never represented as actual endorsements.
export const sampleLeaderQuotes: LeaderQuote[] = [
  { id: "sample-1", quote: "A strong portfolio starts with a real problem, a thoughtful solution, and the courage to keep improving it.", name: "Example mentor", role: "Engineering perspective", company: "Sample quote" },
  { id: "sample-2", quote: "The most valuable part of building together is learning to explain your decisions and listen to feedback.", name: "Example team lead", role: "Collaboration perspective", company: "Sample quote" },
  { id: "sample-3", quote: "Curiosity turns a lesson into an experiment. Finishing that experiment turns it into experience.", name: "Example educator", role: "Learning perspective", company: "Sample quote" },
];

export const QUOTE_ROTATION_MS = 6000;