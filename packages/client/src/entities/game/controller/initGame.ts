import sound from "../ui/Sound/Sound";
import { GameLoop } from "./GameLoop/GameLoop";

export const initGame = (canvas: HTMLCanvasElement) =>
  new GameLoop(canvas, sound);
