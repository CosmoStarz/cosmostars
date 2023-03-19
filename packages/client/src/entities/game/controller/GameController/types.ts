import { Canvas } from "../../ui/Canvas/Canvas";
import { Sound } from "../../ui/Sound/Sound";

export type GameControllerType = {
  scene: Canvas;
  sound: Sound;
  end: () => void;
};
