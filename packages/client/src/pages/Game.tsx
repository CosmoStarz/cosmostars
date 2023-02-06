import { FC, useEffect, useRef } from "react";
import { initGame } from "../entities/game/controller/Game";

export const GamePage: FC = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasElement.current) {
      initGame(canvasElement.current);
    }
  }, [canvasElement]);

  return <canvas className="game-canvas" ref={canvasElement}></canvas>;
};
