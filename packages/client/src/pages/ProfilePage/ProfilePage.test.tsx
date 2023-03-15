import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  shouldMatchSnapshot,
  shouldRenderWithoutError,
} from "../tests/factories";
import { ProfilePage } from "./";

jest.mock("@/entities/user/model/api");

let Page: ReactElement;

describe.skip("Profile Page", () => {
  beforeEach(() => {
    Page = (
      <BrowserRouter>
        <ProfilePage />
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
