import { FC, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store";
import { resetScore } from "@/app/store/score/scoreSlice";
import { Game, initGame } from "@/entities/game/controller/Game";
import { GameModal } from "@/widgets/GameModal/GameModal";

export const GamePage: FC = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game | null>(null);
  const dispatch = useAppDispatch();

  const { score } = useAppSelector(state => state.score);

  useEffect(() => {
    if (canvasElement.current) {
      game.current = initGame(canvasElement.current);
    }
  }, [canvasElement]);

  const startNewGame = () => {
    dispatch(resetScore());
    game.current?.start();
  };

  const resumeGame = () => {
    game.current?.resume();
  };

  return (
    <>
      <div style={{ position: "fixed", top: "0", left: "0", color: "white" }}>
        Score: {score}
      </div>

      <GameModal onStart={startNewGame} onResume={resumeGame} />

      <canvas className="game-canvas" ref={canvasElement}></canvas>
    </>
  );
};
