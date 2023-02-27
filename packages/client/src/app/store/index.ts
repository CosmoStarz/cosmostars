import { ReduceCapacityRounded } from "@mui/icons-material";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { gameReducer } from "@/entities/game/model/store/gameSlice";
import { yandexApi } from "@/shared/api/yandexApi";

import scoreReducer from "./score/scoreSlice";

export const store = configureStore({
  reducer: {
    [yandexApi.reducerPath]: yandexApi.reducer,
    score: scoreReducer,
    game: gameReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(yandexApi.middleware),
  // todo: вынести в конфиг .env
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
