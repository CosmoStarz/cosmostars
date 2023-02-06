import { render, screen } from '@testing-library/react';
import { MainPage } from './MainPage';

describe("Main Page", () => {
  it("should have correct header", () => {
    const header = "Galaxy Spaceship";

    render(<MainPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
