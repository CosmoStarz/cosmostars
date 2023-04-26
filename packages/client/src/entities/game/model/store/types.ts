import { GameStatuses } from "@/shared/constants";

export type GameState = {
  isModalOpened: boolean;
  status: GameStatuses;
  isMutedSound: boolean;
  score: number;
  lives: number;
};
