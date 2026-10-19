import { describe, expect, it } from "vitest";
import { getProgram, programs } from "@/lib/programs";

describe("Program catalogue", () => {
  it("has unique slugs and titles", () => {
    const slugs = programs.map((p) => p.slug);
    const titles = programs.map((p) => p.title);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("runs every program for 4 weeks with one module per week", () => {
    for (const p of programs) {
      expect(p.weeks).toBe(4);
      expect(p.modules).toHaveLength(4);
    }
  });

  it("gives every program outcomes and a final project", () => {
    for (const p of programs) {
      expect(p.outcomes.length).toBeGreaterThan(0);
      expect(p.finalProject).not.toBe("");
    }
  });

  it("groups programs into the expected domains", () => {
    const domains = [...new Set(programs.map((p) => p.category))];
    expect(domains).toEqual([
      "Web Development",
      "Data",
      "AI",
      "Mobile Apps",
      "Cybersecurity",
      "Cloud & DevOps",
      "Programming",
      "Design",
      "Digital Marketing",
    ]);
  });

  it("looks up a program by slug", () => {
    expect(getProgram("agentic-ai")?.title).toBe("Agentic AI");
    expect(getProgram("does-not-exist")).toBeUndefined();
  });
});
