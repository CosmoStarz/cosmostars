import { render, screen } from '@testing-library/react';
import { ForumPage } from './ForumPage';

describe("Forum Page", () => {
  it("should have correct header", () => {
    const header = "Forum";

    render(<ForumPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
