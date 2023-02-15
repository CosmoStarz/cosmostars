import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../entities/user/model";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true
});

