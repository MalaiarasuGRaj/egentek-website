import { act, fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LeaderQuotes } from "@/components/leader-quotes";
import { sampleLeaderQuotes } from "@/lib/leader-quotes";

const state = vi.hoisted(() => ({ data: [] as { id: string; quote: string; name: string; role: string; company: string }[] }));
vi.mock("@/hooks/use-leader-quotes", () => ({ useLeaderQuotes: () => ({ data: state.data, isError: false, isPending: false }) }));

describe("Leader quote rotation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    state.data = [...sampleLeaderQuotes];
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  });
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

  it("automatically cycles through quotes", () => {
    render(<LeaderQuotes />);
    expect(screen.getByRole("figure").textContent).toContain(sampleLeaderQuotes[0]?.quote);
    act(() => { vi.advanceTimersByTime(6000); });
    expect(screen.getByRole("figure").textContent).toContain(sampleLeaderQuotes[1]?.quote);
  });

  it("includes newly added quotes without interrupting the current quote", () => {
    const view = render(<LeaderQuotes />);
    fireEvent.click(screen.getByRole("button", { name: "Next quote" }));
    state.data = [{ id: "new", quote: "A newly published perspective.", name: "Test leader", role: "Mentor", company: "" }, ...state.data];
    view.rerender(<LeaderQuotes />);
    expect(screen.getByRole("figure").textContent).toContain(sampleLeaderQuotes[1]?.quote);
    fireEvent.click(screen.getByRole("button", { name: "Previous quote" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous quote" }));
    expect(screen.getByRole("figure").textContent).toContain("A newly published perspective.");
  });

  it("stops rotation when paused", () => {
    render(<LeaderQuotes />);
    fireEvent.click(screen.getByRole("button", { name: "Pause quotes" }));
    act(() => { vi.advanceTimersByTime(12000); });
    expect(screen.getByRole("figure").textContent).toContain(sampleLeaderQuotes[0]?.quote);
  });
});