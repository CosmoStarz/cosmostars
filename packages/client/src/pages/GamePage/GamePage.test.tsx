import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  shouldMatchSnapshot,
  shouldRenderWithoutError,
} from "../tests/factories";
import { GamePage } from "./GamePage";

jest.mock("@/entities/game/controller/Game");

let Page: ReactElement;

describe("Game Page", () => {
  beforeEach(() => {
    Page = (
      <BrowserRouter>
        <GamePage />
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
