import { FC, useEffect, useRef } from "react";
import { initGame } from "../entities/game/controller/Game";
import { GameModal } from "../widgets/GameModal/GameModal";
import { GameModalConfig, GameStatuses } from "../shared/constants";

export const GamePage: FC = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasElement.current) {
      initGame(canvasElement.current);
    }
  }, [canvasElement]);

  return (
    <>
      <GameModal {...GameModalConfig[GameStatuses.START]} />
      <canvas className="game-canvas" ref={canvasElement}></canvas>
    </>
  );
};
