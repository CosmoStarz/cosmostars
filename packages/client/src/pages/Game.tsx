import { FC, useEffect, useRef } from "react";
import { initGame } from "../entities/game/controller/Game";

export const GamePage: FC = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasEl.current) {
      initGame(canvasEl.current);
    }
  }, [canvasEl]);

  return <canvas className="game-canvas" ref={canvasEl}></canvas>;
};
