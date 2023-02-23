import { configureStore } from "@reduxjs/toolkit";

import { gameReducer } from "@/entities/game/model/store/gameSlice";
import { authApi } from "@/entities/user/model";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    game: gameReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});
