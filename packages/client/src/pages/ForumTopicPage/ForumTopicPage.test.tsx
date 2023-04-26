import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  shouldMatchSnapshot,
  shouldRenderWithoutError,
} from "../tests/factories";
import { ForumTopicPage } from "./ForumTopicPage";

let Page: ReactElement;

describe("Forum Topic Page", () => {
  beforeEach(() => {
    Page = (
      <BrowserRouter>
        <ForumTopicPage />
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
