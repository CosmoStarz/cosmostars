import { GameStatuses } from "@/shared/constants";

export type GameState = {
  isModalOpened: boolean;
  status: GameStatuses;
  score: number;
};
