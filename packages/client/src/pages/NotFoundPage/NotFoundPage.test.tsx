import { render, screen } from "@testing-library/react";
import { NotFoundPage } from "./NotFoundPage";

describe("NotFound Page", () => {
  it("should render without error", () => {
    expect(() => render(<NotFoundPage />)).not.toThrowError();
  });

  it("should have correct header", () => {
    const header = "404";

    render(<NotFoundPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
