import { act, fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LeaderQuotes } from "@/components/leader-quotes";
import { QUOTE_ROTATION_MS, sampleLeaderQuotes } from "@/lib/leader-quotes";

const state = vi.hoisted(() => ({ data: [] as { id: string; quote: string; name: string; role: string; company: string }[] }));
vi.mock("@/hooks/use-leader-quotes", () => ({ useLeaderQuotes: () => ({ data: state.data, isError: false, isPending: false }) }));

describe("Leader quote rotation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    state.data = [...sampleLeaderQuotes];
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  });
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

  it("slides through sourced AI perspectives from multiple leaders", () => {
    const { container } = render(<LeaderQuotes />);
    expect(screen.getByRole("heading", { name: "AI, in their words" })).toBeInTheDocument();
    expect(screen.getByRole("blockquote").textContent).toContain(sampleLeaderQuotes[0]?.quote);
    expect(screen.getByText("Andrew Ng")).toBeInTheDocument();
    expect(container.querySelector("img")).toHaveAttribute("src", sampleLeaderQuotes[0]?.imageUrl);
    expect(screen.getByRole("link", { name: "Quote source" })).toHaveAttribute("href", sampleLeaderQuotes[0]?.sourceUrl);

    fireEvent.click(screen.getByRole("button", { name: "Next leader quote" }));
    expect(screen.getByRole("blockquote").textContent).toContain(sampleLeaderQuotes[1]?.quote);
    expect(screen.getByText("Sam Altman")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next leader quote" }));
    expect(screen.getByText("Demis Hassabis")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(QUOTE_ROTATION_MS); });
    expect(screen.getByRole("blockquote").textContent).toContain(sampleLeaderQuotes[3]?.quote);
  });

  it("shows published leader quotes in the slideshow when available", () => {
    const view = render(<LeaderQuotes />);
    state.data = [
      { id: "live-1", quote: "AI can help people discover new ideas.", name: "Published leader", role: "Researcher", company: "Example Lab" },
      { id: "live-2", quote: "Thoughtful tools help teams do more.", name: "Another leader", role: "Engineer", company: "Example Co" },
    ];
    view.rerender(<LeaderQuotes />);
    expect(screen.getByText("“AI can help people discover new ideas.”")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next leader quote" }));
    expect(screen.getByText("“Thoughtful tools help teams do more.”")).toBeInTheDocument();
    expect(screen.queryByText(`“${sampleLeaderQuotes[0]?.quote}”`)).not.toBeInTheDocument();
  });
});