import { configureStore } from "@reduxjs/toolkit";

import { authModel } from "@/entities/auth";
import { authApi } from "@/shared/api";

export const store = configureStore({
  reducer: {
    [authApi.auth.authApi.reducerPath]: authApi.auth.authApi.reducer,
    auth: authModel.authSlice.authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.auth.authApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});
