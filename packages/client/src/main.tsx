import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./app";
import { persistor, store } from "./app/store";
import { ErrorBoundary } from "./shared/utils/ErrorBoundary/ErrorBoundary";
import { initServiceWorker } from "./shared/utils/initServiceWorker";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

initServiceWorker();
