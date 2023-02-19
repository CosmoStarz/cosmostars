import { FC, useEffect, useRef } from "react";

import { Game, initGame } from "@/entities/game/controller/Game";
import { GameModalConfig, GameStatuses } from "@/shared/constants";
import { GameModal } from "@/widgets/GameModal/GameModal";

export const GamePage: FC = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game | null>(null);

  useEffect(() => {
    if (canvasElement.current) {
      game.current = initGame(canvasElement.current);
    }
  }, [canvasElement]);

  const startNewGame = () => {
    game.current?.init();
  };

  return (
    <>
      <GameModal
        {...GameModalConfig[GameStatuses.START]}
        onStart={startNewGame}
      />
      <canvas className="game-canvas" ref={canvasElement}></canvas>
    </>
  );
};
