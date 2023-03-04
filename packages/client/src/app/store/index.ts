import { configureStore } from "@reduxjs/toolkit";

import { gameReducer } from "@/entities/game/model/store/gameSlice";
import { authReducer } from "@/entities/user/model/user";
import { yandexApi } from "@/shared/api/yandexApi";
export const store = configureStore({
  reducer: {
    [yandexApi.reducerPath]: yandexApi.reducer,
    auth: authReducer,
    game: gameReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(yandexApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});
