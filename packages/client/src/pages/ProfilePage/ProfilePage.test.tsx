import { render, screen } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';

describe("Profile Page", () => {
  it("should have correct header", () => {
    const header = "Profile";

    render(<ProfilePage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
