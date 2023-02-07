import { render, screen } from "@testing-library/react";
import { GamePage } from "./GamePage";

describe("Game Page", () => {
  it("should render without error", () => {
    expect(() => render(<GamePage />)).not.toThrowError();
  });

  it("should have correct header", () => {
    const header = "Game";

    render(<GamePage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
