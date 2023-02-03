import { render, screen } from '@testing-library/react';
import { RegPage } from './RegPage';

describe.only('Reg Page', () => {
  it('should have correct header', () => {
    const header = 'Sign Up';

    render(<RegPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty('tagName', 'H1');
  });
});
