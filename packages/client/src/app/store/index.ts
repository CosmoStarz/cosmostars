import { configureStore } from "@reduxjs/toolkit";

import { yandexApi } from "@/shared/api/yandexApi";

export const store = configureStore({
  reducer: {
    [yandexApi.reducerPath]: yandexApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(yandexApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});
