import { configureStore } from "@reduxjs/toolkit";
import {
  PERSIST,
  persistReducer,
  persistStore,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { gameReducer } from "@/entities/game/model/store/gameSlice";
import { authReducer } from "@/entities/user/model/user";
import { yandexApi } from "@/shared/api/yandexApi";

const config = {
  key: "root",
  storage,
};

const persistGameReducer = persistReducer(config, gameReducer);

export const store = configureStore({
  preloadedState:
    typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined,
  reducer: {
    [yandexApi.reducerPath]: yandexApi.reducer,
    auth: authReducer,
    game: persistGameReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }).concat(yandexApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});

export const persistor = persistStore(store);
