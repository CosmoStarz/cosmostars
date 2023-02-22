import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/entities/user/model";
import { yandexApi } from "@/shared/api/yandexApi";

export const store = configureStore({
  reducer: {
    [yandexApi.reducerPath]: yandexApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(yandexApi.middleware, authApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});
