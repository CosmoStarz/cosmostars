import { render, screen } from '@testing-library/react';

describe('Main Page', () => {
  it('should have correct header', () => {
    const header = 'Galaxy Spaceship';

    render(<MainPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty('tagName', 'H1');
  });
});
