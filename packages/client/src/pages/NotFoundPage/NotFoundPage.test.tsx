import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  shouldMatchSnapshot,
  shouldRenderWithoutError,
} from "../tests/factories";
import { NotFoundPage } from "./NotFoundPage";

let Page: ReactElement;

describe("Not Found Page", () => {
  beforeEach(() => {
    Page = (
      <BrowserRouter>
        <NotFoundPage />
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
