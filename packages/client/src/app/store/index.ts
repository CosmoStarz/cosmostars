import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

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
  auth: authReducer,
  game: persistGameReducer,
  notification: notificationReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat([yandexApi.middleware, notificationMiddleware]),
  // todo: вынести в конфиг .env
  devTools: true,
});

export const persistor = persistStore(store);
