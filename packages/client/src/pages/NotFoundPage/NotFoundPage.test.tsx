import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe.only('NotFound Page', () => {
  it('should have correct header', () => {
    const header = '404';

    render(<NotFoundPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty('tagName', 'H1');
  });
});
