import { describe, expect, it } from "vitest";
import { allPrograms, getProgram, programs } from "@/lib/programs";

describe("Program catalogue", () => {
  it("has unique slugs and titles across all programs", () => {
    const slugs = allPrograms.map((p) => p.slug);
    const titles = allPrograms.map((p) => p.title);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("runs every program for 4 weeks with one module per week", () => {
    for (const p of allPrograms) {
      expect(p.weeks).toBe(4);
      expect(p.modules).toHaveLength(4);
    }
  });

  it("gives every program outcomes and a final project", () => {
    for (const p of allPrograms) {
      expect(p.outcomes.length).toBeGreaterThan(0);
      expect(p.finalProject).not.toBe("");
    }
  });

  it("activates only Data and AI domains initially", () => {
    const domains = [...new Set(programs.map((p) => p.category))];
    expect(domains).toEqual(["Data", "AI"]);
  });

  it("retains all 9 domains in the master catalogue", () => {
    const domains = [...new Set(allPrograms.map((p) => p.category))];
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

  it("looks up active programs and excludes inactive tracks", () => {
    expect(getProgram("agentic-ai")?.title).toBe("Agentic AI");
    expect(getProgram("data-science")?.title).toBe("Data Science");
    expect(getProgram("front-end-development")).toBeUndefined();
    expect(getProgram("does-not-exist")).toBeUndefined();
  });
});
