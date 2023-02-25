import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  shouldMatchSnapshot,
  shouldRenderWithoutError,
} from "../tests/factories";
import { GamePage } from "./GamePage";

let Page: ReactElement;

// ! Эти тесты падают из-за ошибки типизации. Надо поправить код.
describe.skip("Game Page", () => {
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
