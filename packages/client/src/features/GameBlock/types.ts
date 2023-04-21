import { ReactNode } from "react";

export enum GameBlockPosition {
  LEFT = "left",
  RIGHT = "right",
}

export type GameBlockType = {
  children: ReactNode;
  position: GameBlockPosition;
};
