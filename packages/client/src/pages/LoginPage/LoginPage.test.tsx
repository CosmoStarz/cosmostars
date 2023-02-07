import { render, screen } from "@testing-library/react";
import { LoginPage } from "./LoginPage";
import { BrowserRouter } from "react-router-dom";

describe("Auth Page", () => {
  it("should render without error", () => {
    expect(() =>
      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      )
    ).not.toThrowError();
  });

  it("should have correct header", () => {
    const header = "Login";

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
