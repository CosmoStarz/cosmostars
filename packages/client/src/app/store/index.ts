import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/shared/api";

export const store = configureStore({
  reducer: {
    [authApi.auth.authApi.reducerPath]: authApi.auth.authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.auth.authApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});
