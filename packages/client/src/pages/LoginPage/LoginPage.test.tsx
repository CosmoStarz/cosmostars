import { render, screen } from '@testing-library/react';
import { LoginPage } from "./LoginPage";

describe("Auth Page", () => {
  it("should have correct header", () => {
    const header = "Login";

    render(<LoginPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
