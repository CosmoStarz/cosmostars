import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EnemyPoints } from "@/shared/constants";

type ScoreState = {
  score: number;
};

const initialState: ScoreState = {
  score: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    incrementScoreByEnemy: (
      state,
      { payload }: PayloadAction<keyof typeof EnemyPoints>
    ) => {
      state.score += EnemyPoints[payload];
    },
    resetScore: state => {
      state.score = 0;
    },
  },
});

export const { incrementScoreByEnemy, resetScore } = scoreSlice.actions;

export default scoreSlice.reducer;
