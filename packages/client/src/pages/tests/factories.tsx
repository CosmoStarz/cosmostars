import { render } from "@testing-library/react";
import { FetchMock } from "jest-fetch-mock/types";
import { ReactElement } from "react";
import { Provider } from "react-redux";

import { store } from "@/app/store";

const reset = () => {
  (fetch as FetchMock).resetMocks();
};

export const shouldRenderWithoutError = (Element: ReactElement) => {
  reset();

  expect(() =>
    render(<Provider store={store}>{Element}</Provider>)
  ).not.toThrowError();
};

export const shouldMatchSnapshot = (Element: ReactElement) => {
  reset();

  const { container } = render(<Provider store={store}>{Element}</Provider>);
  expect(container).toMatchSnapshot();
};
