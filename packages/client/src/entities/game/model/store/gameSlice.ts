import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GameStatuses } from "@/shared/constants";

import { GameState } from "./types";

const initialState: GameState = {
  status: GameStatuses.NOT_ACTIVE,
  isModalOpened: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameStatus: (state, { payload }: PayloadAction<GameStatuses>) => {
      state.status = payload;
      state.isModalOpened = payload > GameStatuses.ACTIVE;
    },
  },
});

export const { setGameStatus } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
