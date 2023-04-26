import { RootState } from "@/app/store/types";

export const gameStatusSelector = (state: RootState) => state.game.status;
export const gameModalSelector = (state: RootState) => state.game.isModalOpened;
export const isMutedSoundSelector = (state: RootState) =>
  state.game.isMutedSound;
export const gameScoreSelector = (state: RootState) => state.game.score;
export const playerLivesSelector = (state: RootState) => state.game.lives;
