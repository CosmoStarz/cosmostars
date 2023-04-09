import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  EnemyDamage,
  EnemyPoints,
  GameStatuses,
  maxPlayerLives,
} from "@/shared/constants";

import { GameState } from "./types";

const initialState: GameState = {
  status: GameStatuses.NOT_ACTIVE,
  isModalOpened: false,
  isMutedSound: false,
  score: 0,
  lives: maxPlayerLives,
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
    incrementScoreByEnemy: (
      state,
      { payload }: PayloadAction<keyof typeof EnemyPoints>
    ) => {
      state.score += EnemyPoints[payload];
    },
    decrementLives: (state, { payload }: PayloadAction<EnemyDamage>) => {
      state.lives -= payload;
    },
    resetGameState: state => {
      state.score = 0;
      state.lives = maxPlayerLives;
    },
  },
});

export const {
  setGameStatus,
  toggleIsMutedSound,
  incrementScoreByEnemy,
  resetGameState,
  decrementLives,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
