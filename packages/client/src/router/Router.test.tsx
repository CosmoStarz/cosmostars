import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Link } from "react-router-dom";
import { RoutesName } from "../shared/constants";
import { Router } from "./Router";

const renderRouterWithLink = (path: string) =>
  render(
    <BrowserRouter>
      <Link data-testid="link" to={path}></Link>
      <Router />
    </BrowserRouter>
  );

// TODO Сделать queries через screen
describe("Router", () => {
  it("should direct to leaderboard page", () => {
    const path = RoutesName.LEADERBOARD;
    const testId = "leaderboard-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to forum page", () => {
    const path = RoutesName.FORUM;
    const testId = "forum-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to forum topic page", () => {
    const path = RoutesName.FORUM_DETAIL;
    const testId = "forum-topic-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to game page", () => {
    const path = RoutesName.GAME;
    const testId = "game-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to profile page", () => {
    const path = RoutesName.PROFILE;
    const testId = "profile-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to authorization page", () => {
    const path = RoutesName.LOGIN;
    const testId = "auth-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to registration page", () => {
    const path = RoutesName.REGISTRATION;
    const testId = "reg-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to main page", () => {
    const path = RoutesName.MAIN;
    const testId = "main-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it("should direct to not found page", () => {
    const path = "/blabla";
    const testId = "not-found-page";

    renderRouterWithLink(path);
    fireEvent.click(screen.getByTestId("link"));

    expect(screen.getByTestId(testId)).toBeDefined();
  });

  it.todo("should not reload browser page");
});
