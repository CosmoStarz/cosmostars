import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";

import App from "./src/app";
import { store } from "./src/app/store";

export function render(url: string) {
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
          <App />
      </Provider>
    </StaticRouter>
  );

  const preloadedState = store.getState();

  const stateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
    preloadedState
  ).replace(/</g, "\\u003c")}
  </script>`;

  return { appHtml, stateScript };
}
