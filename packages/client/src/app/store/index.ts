import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/shared/api";
import { authModel } from "@/entities/auth";

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
