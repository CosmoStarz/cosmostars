import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  shouldMatchSnapshot,
  shouldRenderWithoutError,
} from "../tests/factories";
import { LeaderboardPage } from "./LeaderboardPage";

jest.mock("@/entities/leaderboard/api");

let Page: ReactElement;

describe("Leaderboard Page", () => {
  beforeEach(() => {
    Page = (
      <BrowserRouter>
        <LeaderboardPage />
      </BrowserRouter>
    );
  });

  it("should render without error", () => {
    shouldRenderWithoutError(Page);
  });

  it("should match snapshot", () => {
    shouldMatchSnapshot(Page);
  });
});
