import { describe, expect, it } from "vitest";
import { matchesProgramSearch } from "@/lib/program-search";
import { allPrograms, type Program } from "@/lib/programs";

const find = (slug: string): Program => {
  const program = allPrograms.find((p) => p.slug === slug);
  if (!program) throw new Error(`Missing program ${slug}`);
  return program;
};

describe("Program search", () => {
  const dataAnalytics = find("data-analytics");

  it("matches every program for an empty or punctuation-only query", () => {
    for (const p of allPrograms) {
      expect(matchesProgramSearch(p, "")).toBe(true);
      expect(matchesProgramSearch(p, "   ")).toBe(true);
      expect(matchesProgramSearch(p, " & - ")).toBe(true);
    }
  });

  it("ignores case and surrounding spaces", () => {
    expect(matchesProgramSearch(dataAnalytics, "  PYTHON  ")).toBe(true);
  });

  it("finds a track when the words are typed in any order", () => {
    expect(matchesProgramSearch(dataAnalytics, "python sql")).toBe(true);
    expect(matchesProgramSearch(dataAnalytics, "sql python")).toBe(true);
    expect(matchesProgramSearch(dataAnalytics, "pandas excel")).toBe(true);
  });

  it("treats hyphens and punctuation as word breaks", () => {
    expect(matchesProgramSearch(find("machine-learning"), "scikit learn")).toBe(true);
    expect(matchesProgramSearch(find("data-visualization"), "power bi")).toBe(true);
    expect(matchesProgramSearch(find("generative-ai"), "node.js")).toBe(false);
  });

  it("matches the start of a word, not the middle", () => {
    expect(matchesProgramSearch(find("devops-cicd"), "deploy")).toBe(true);
    expect(matchesProgramSearch(dataAnalytics, "ython")).toBe(false);
    expect(matchesProgramSearch(dataAnalytics, "ai")).toBe(false);
  });

  it("searches the domain name, so each AI track matches AI", () => {
    const aiTracks = allPrograms.filter((p) => p.category === "AI");
    expect(aiTracks.length).toBeGreaterThan(0);
    for (const p of aiTracks) {
      expect(matchesProgramSearch(p, "AI")).toBe(true);
    }
  });

  it("searches outcomes as well as titles and tags", () => {
    expect(matchesProgramSearch(dataAnalytics, "analyse")).toBe(true);
  });

  it("requires every term to match", () => {
    expect(matchesProgramSearch(dataAnalytics, "python kubernetes")).toBe(false);
  });
});
