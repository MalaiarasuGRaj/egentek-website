import { act, fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LeaderQuotes } from "@/components/leader-quotes";
import { QUOTE_ROTATION_MS, leaderQuotes } from "@/lib/leader-quotes";

describe("Leader quote carousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("shows the first leader and auto-advances without a pause control", () => {
    render(<LeaderQuotes />);
    expect(screen.getByRole("heading", { name: "AI, in their words" })).toBeInTheDocument();
    expect(screen.getByText("Andrew Ng")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /pause|play/i })).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(QUOTE_ROTATION_MS);
    });
    expect(screen.getByText("Sam Altman")).toBeInTheDocument();
  });

  it("moves back and forward with the navigation buttons", () => {
    render(<LeaderQuotes />);
    fireEvent.click(screen.getByRole("button", { name: "Next leader quote" }));
    expect(screen.getByText("Sam Altman")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous leader quote" }));
    expect(screen.getByText("Andrew Ng")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous leader quote" }));
    expect(screen.getByText(leaderQuotes[leaderQuotes.length - 1]!.name)).toBeInTheDocument();
  });

  it("restarts the interval after a manual click", () => {
    render(<LeaderQuotes />);
    act(() => {
      vi.advanceTimersByTime(QUOTE_ROTATION_MS - 1000);
    });
    fireEvent.click(screen.getByRole("button", { name: "Next leader quote" }));
    act(() => {
      vi.advanceTimersByTime(QUOTE_ROTATION_MS - 1000);
    });
    expect(screen.getByText("Sam Altman")).toBeInTheDocument();
  });

  it("pauses auto-advance while hovered", () => {
    const { container } = render(<LeaderQuotes />);
    const section = container.querySelector("section")!;
    fireEvent.mouseEnter(section);
    act(() => {
      vi.advanceTimersByTime(QUOTE_ROTATION_MS * 3);
    });
    expect(screen.getByText("Andrew Ng")).toBeInTheDocument();
    fireEvent.mouseLeave(section);
    act(() => {
      vi.advanceTimersByTime(QUOTE_ROTATION_MS);
    });
    expect(screen.getByText("Sam Altman")).toBeInTheDocument();
  });

  it("lists each leader once with a self-hosted photo", () => {
    const names = leaderQuotes.map((quote) => quote.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names).toEqual(
      expect.arrayContaining(["Jensen Huang", "Sundar Pichai", "Satya Nadella"]),
    );
    for (const quote of leaderQuotes) {
      expect(quote.imageUrl.startsWith("/leaders/")).toBe(true);
    }
  });
});
