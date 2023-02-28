import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GameStatuses } from "@/shared/constants";

import { GameState } from "./types";

const initialState: GameState = {
  status: GameStatuses.NOT_ACTIVE,
  isModalOpened: false,
  isMutedSound: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameStatus: (state, { payload }: PayloadAction<GameStatuses>) => {
      state.status = payload;
      state.isModalOpened = payload > GameStatuses.ACTIVE;
    },
    toggleIsMutedSound: state => {
      state.isMutedSound = !state.isMutedSound;
    },
  },
});

export const { setGameStatus, toggleIsMutedSound } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
