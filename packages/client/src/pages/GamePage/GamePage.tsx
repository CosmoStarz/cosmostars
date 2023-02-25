import { FC, useEffect, useRef } from "react";

import { useAppSelector } from "@/app/store";
import { Game, initGame } from "@/entities/game/controller/Game";
import { GameModalConfig, GameStatuses } from "@/shared/constants";
import { GameModal } from "@/widgets/GameModal/GameModal";

export const GamePage: FC = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game | null>(null);

  const { score } = useAppSelector(state => state.score);

  useEffect(() => {
    if (canvasElement.current) {
      game.current = initGame(canvasElement.current);
    }
  }, [canvasElement]);

  const startNewGame = () => {
    game.current?.start();
  };

  return (
    <>
      <GameModal
        {...GameModalConfig[GameStatuses.START]}
        onStart={startNewGame}
      />
      <div style={{ position: "fixed", top: "0", left: "0", color: "white" }}>
        Score: {score}
      </div>
      <canvas className="game-canvas" ref={canvasElement}></canvas>
    </>
  );
};
