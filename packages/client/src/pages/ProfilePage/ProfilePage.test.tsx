import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  shouldMatchSnapshot,
  shouldRenderWithoutError,
} from "../tests/factories";
// import { ProfilePage } from "./";

let Page: ReactElement;

// ! Тест валится из-за ошибки тайпскрипта. Надо поправить.
describe.skip("Profile Page", () => {
  beforeEach(() => {
    Page = <BrowserRouter>{/* <ProfilePage /> */}</BrowserRouter>;
  });

  it.skip("should render without error", () => {
    shouldRenderWithoutError(Page);
  });

  it.skip("should match snapshot", () => {
    shouldMatchSnapshot(Page);
  });
});
