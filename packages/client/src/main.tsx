import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { ErrorBoundary } from "./shared/utils/ErrorBoundary/ErrorBoundary";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
