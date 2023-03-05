import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./app";
import { store } from "./app/store";
import { ErrorBoundary } from "./shared/utils/ErrorBoundary/ErrorBoundary";
import { initServiceWorker } from "./shared/utils/initServiceWorker";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

initServiceWorker();
