import { Box } from "@mui/material";
import { FC, useEffect, useRef } from "react";

import { GameLoop } from "@/entities/game/controller/GameLoop/GameLoop";
import { initGame } from "@/entities/game/controller/initGame";
import { gameScoreSelector } from "@/entities/game/model/store/selectors";
import { GameBlock } from "@/features/GameBlock/GameBlock";
import { GameBlockPosition } from "@/features/GameBlock/types";
import { LivesContainer } from "@/features/LivesContainer/LivesContainer";
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
      <GameBlock position={GameBlockPosition.LEFT}>
        <Box p={1}>Score: {score}</Box>
      </GameBlock>
      <LivesContainer />
      <GameModal onStart={startNewGame} onResume={resumeGame} />
      <canvas className="game-canvas" ref={canvasElement}></canvas>
    </>
  );
};
