import { RootState } from "@/app/store/types";

export const gameStatusSelector = (state: RootState) => state.game.status;
export const gameModalSelector = (state: RootState) => state.game.isModalOpened;
export const gameScoreSelector = (state: RootState) => state.game.score;
