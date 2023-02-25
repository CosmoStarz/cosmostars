import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  shouldMatchSnapshot,
  shouldRenderWithoutError,
} from "../tests/factories";
import { SignUpPage } from "./";

let Page: ReactElement;

// ! Тест валится из-за ошибки тайпскрипта. Надо поправить.
describe.skip("Sign Up Page", () => {
  beforeEach(() => {
    Page = (
      <BrowserRouter>
        <SignUpPage />
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
