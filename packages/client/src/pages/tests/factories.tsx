import { render } from "@testing-library/react";
import { ReactElement } from "react";

export const shouldRenderWithoutError = (Element: ReactElement) => {
  expect(() => render(Element)).not.toThrowError();
};

export const shouldMatchSnapshot = (Element: ReactElement) => {
  const { container } = render(Element);
  expect(container).toMatchSnapshot();
};
