import { render } from '@testing-library/react';
import { Router } from './Router';

describe.only('Router', () => {
  it('should direct to leaderboard page', () => {
    const path = '/leaderboard';
    const testId = 'leaderboard-page';

    const { getByTestId } = render(<Router />);
    location.pathname = path;

    expect(getByTestId(testId)).toBeDefined();
  });

  it('should direct to forum page', () => {
    const path = '/forum';
    const testId = 'forum-page';

    const { getByTestId } = render(<Router />);
    location.pathname = path;

    expect(getByTestId(testId)).toBeDefined();
  });

  it('should direct to profile page', () => {
    const path = '/profile';
    const testId = 'profile-page';

    const { getByTestId } = render(<Router />);
    location.pathname = path;

    expect(getByTestId(testId)).toBeDefined();
  });

  it('should direct to authorization page', () => {
    const path = '/auth';
    const testId = 'auth-page';

    const { getByTestId } = render(<Router />);
    location.pathname = path;

    expect(getByTestId(testId)).toBeDefined();
  });

  it('should direct to registration page', () => {
    const path = '/reg';
    const testId = 'reg-page';

    const { getByTestId } = render(<Router />);
    location.pathname = path;

    expect(getByTestId(testId)).toBeDefined();
  });

  it('should direct to main page', () => {
    const path = '/';
    const testId = 'main-page';

    const { getByTestId } = render(<Router />);
    location.pathname = path;

    expect(getByTestId(testId)).toBeDefined();
  });

  it('should direct to not found page', () => {
    const path = '/blabla';
    const testId = 'not-found-page';

    const { getByTestId } = render(<Router />);
    location.pathname = path;

    expect(getByTestId(testId)).toBeDefined();
  });

  it.todo('should not reload browser page');
});
