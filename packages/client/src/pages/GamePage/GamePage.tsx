import { Box } from "@mui/material";
import { FC, useEffect, useRef } from "react";

import { GameLoop } from "@/entities/game/controller/GameLoop/GameLoop";
import { initGame } from "@/entities/game/controller/initGame";
import { gameScoreSelector } from "@/entities/game/model/store/selectors";
import { BaseGameColors, ThemeBorderRadius } from "@/shared/constants";
import { useAppSelector } from "@/shared/hooks/store";
import { GameModal } from "@/widgets/GameModal/GameModal";

export const GamePage: FC = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const game = useRef<GameLoop | null>(null);

  const score = useAppSelector(gameScoreSelector);

  useEffect(() => {
    if (canvasElement.current) {
      game.current = initGame(canvasElement.current);
    }

    return () => game.current?.clearGameState();
  }, [canvasElement]);

  const startNewGame = () => {
    game.current?.start();
  };

  const resumeGame = () => {
    game.current?.resume();
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: ThemeBorderRadius.BUTTON,
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
