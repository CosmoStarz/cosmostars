import { render, screen } from "@testing-library/react";
import { LeaderboardPage } from "./LeaderboardPage";

describe("Leaderboard Page", () => {
  it("should have correct header", () => {
    const header = "Leader Board";

    render(<LeaderboardPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
