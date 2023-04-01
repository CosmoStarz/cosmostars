import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  PERSIST,
  persistReducer,
  persistStore,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { forumApi } from "@/entities/forum/api/forumApi";
import { gameReducer } from "@/entities/game/model/store/gameSlice";
import {
  notificationMiddleware,
  notificationReducer,
} from "@/entities/notification";
import { authReducer } from "@/entities/user/model/user";
import { yandexApi } from "@/shared/api/yandexApi";

const config = {
  key: "root",
  storage,
};

const persistGameReducer = persistReducer(config, gameReducer);

export const reducer = combineReducers({
  [yandexApi.reducerPath]: yandexApi.reducer,
  [forumApi.reducerPath]: forumApi.reducer,
  auth: authReducer,
  game: persistGameReducer,
  notification: notificationReducer,
});

export const store = configureStore({
  preloadedState:
    typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined,
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }).concat([
      yandexApi.middleware,
      forumApi.middleware,
      notificationMiddleware,
    ]),
  // todo: вынести в конфиг .env
  devTools: true,
});

export const persistor = persistStore(store);
