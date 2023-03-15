import { Player } from "../../model/Player/Player";
import { Sound } from "../Sound/Sound";

export type GameListenersType = {
  canvas: HTMLCanvasElement;
  sound: Sound;
  player: Player;
  pause: () => void;
};
