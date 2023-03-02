import { Box } from "@mui/material";
import { FC, useEffect, useRef } from "react";

import { Game, initGame } from "@/entities/game/controller/Game";
import { resetScore } from "@/entities/game/model/store/gameSlice";
import { gameScoreSelector } from "@/entities/game/model/store/selectors";
import { BaseGameColors } from "@/shared/constants";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";
import { GameModal } from "@/widgets/GameModal/GameModal";

export const GamePage: FC = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game | null>(null);
  const dispatch = useAppDispatch();

  const score = useAppSelector(gameScoreSelector);

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
      <Box
        sx={{
          borderRadius: "20px",
          border: "1px solid white",
          px: "15px",
          position: "fixed",
          top: "10px",
          left: "5px",
          color: BaseGameColors.WHITE,
        }}>
        Score: {score}
      </Box>

      <GameModal onStart={startNewGame} onResume={resumeGame} />

      <canvas className="game-canvas" ref={canvasElement}></canvas>
    </>
  );
};
