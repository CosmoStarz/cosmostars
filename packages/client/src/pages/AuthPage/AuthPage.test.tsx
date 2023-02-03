import { render, screen } from '@testing-library/react';
import { AuthPage } from './AuthPage';

describe.only('Auth Page', () => {
  it('should have correct header', () => {
    const header = 'Login';

    render(<AuthPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty('tagName', 'H1');
  });
});
