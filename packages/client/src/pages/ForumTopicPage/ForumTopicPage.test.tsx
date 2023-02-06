import { render, screen } from "@testing-library/react";
import { ForumTopicPage } from "./ForumTopicPage";

describe("Forum Topic Page", () => {
  it("should have correct header", () => {
    const header = "Topic";

    render(<ForumTopicPage />);
    const headerElem = screen.getByText(header, { exact: false });

    expect(headerElem).toBeDefined();
    expect(headerElem).toHaveProperty("tagName", "H1");
  });
});
