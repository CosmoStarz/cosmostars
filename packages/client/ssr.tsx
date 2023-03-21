import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";

import App from "./src/app";
import { store } from "./src/app/store";

export function render() {
  const appHtml = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const preloadedState = store.getState();

  const stateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
    preloadedState
  ).replace(/</g, "\\u003c")}
  </script>`;

  return { appHtml, stateScript };
}
