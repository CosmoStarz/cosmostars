import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "@/entities/game/model/store/gameSlice";
import { authApi } from "@/shared/api";
import { yandexApi } from "@/shared/api/yandexApi";

export const store = configureStore({
  reducer: {
    [yandexApi.reducerPath]: yandexApi.reducer,
    [authApi.auth.authApi.reducerPath]: authApi.auth.authApi.reducer,
    game: gameReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.auth.authApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});
