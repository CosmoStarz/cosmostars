import { GameStatuses } from "../../shared/constants";

export type GameModalTypes =
  | GameStatuses.START
  | GameStatuses.LOOSE
  | GameStatuses.WIN
  | GameStatuses.PAUSED;

export type GameModalProps = {
  title: string;
  startButton: string;
  canBeResumed?: boolean;
  rulesVisibility?: boolean;
  scoreVisibility?: boolean;
  rightImg?: string;
  leftImg?: string;
};
