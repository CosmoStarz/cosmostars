import { configureStore } from "@reduxjs/toolkit";

import { gameReducer } from "@/entities/game/model/store/gameSlice";
import { yandexApi } from "@/shared/api/yandexApi";

export const store = configureStore({
  reducer: {
    [yandexApi.reducerPath]: yandexApi.reducer,
    game: gameReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(yandexApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});
