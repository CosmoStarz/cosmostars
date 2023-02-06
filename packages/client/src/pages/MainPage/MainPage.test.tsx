import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';
import { BrowserRouter } from "react-router-dom";


describe("Main Page", () => {
  it("should have correct header", () => {
    const header = "Galaxy Spaceship";

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
