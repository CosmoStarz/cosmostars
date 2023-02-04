import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Link } from "react-router-dom";
import { RoutesName } from "../shared/constants";
import { Router } from "./Router";

// TODO Сделать queries через screen
describe("Router", () => {
  it("should direct to leaderboard page", () => {
    const path = RoutesName.LEADERBOARD;
    const testId = "leaderboard-page";

    render(
      <BrowserRouter>
        <Link data-testid="link" to={path}></Link>
        <Router />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to forum page", () => {
    const path = RoutesName.FORUM;
    const testId = "forum-page";

    render(
      <BrowserRouter>
        <Link data-testid="link" to={path}></Link>
        <Router />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to forum detail page", () => {
    const path = RoutesName.FORUM_DETAIL;
    const testId = "forum-detail-page";

    render(
      <BrowserRouter>
        <Link data-testid="link" to={path}></Link>
        <Router />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to profile page", () => {
    const path = RoutesName.PROFILE;
    const testId = "profile-page";

    render(
      <BrowserRouter>
        <Link data-testid="link" to={path}></Link>
        <Router />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to authorization page", () => {
    const path = RoutesName.LOGIN;
    const testId = "auth-page";

    render(
      <BrowserRouter>
        <Link data-testid="link" to={path}></Link>
        <Router />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to registration page", () => {
    const path = RoutesName.REGISTRATION;
    const testId = "reg-page";

    render(
      <BrowserRouter>
        <Link data-testid="link" to={path}></Link>
        <Router />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to main page", () => {
    const path = RoutesName.MAIN;
    const testId = "main-page";

    render(
      <BrowserRouter>
        <Link data-testid="link" to={path}></Link>
        <Router />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to not found page", () => {
    const path = "/blabla";
    const testId = "not-found-page";

    render(
      <BrowserRouter>
        <Link data-testid="link" to={path}></Link>
        <Router />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it.todo("should not reload browser page");
});
