import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { setGameStatus } from "@/entities/game/model/store/gameSlice";
import { GameStatuses, RoutesName } from "@/shared/constants";
import { useAppDispatch } from "@/shared/hooks/store";
import { MainLayout } from "@/shared/layouts/MainLayout";

export const MainPage: FC = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(RoutesName.GAME);
    // dispatch(setGameStatus(GameStatuses.START));
  };

  return (
    <MainLayout>
      <Box
        data-testid="main-page"
        className="main-page"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          my: "auto",
          height: "70%",
          width: "100%",
        }}>
        <Typography
          component="h1"
          className="main-page__name"
          sx={{
            fontSize: "144px",
            letterSpacing: "0.01em",
            color: "transparent",
            textShadow:
              " 5px 4px 6px #011133, 0px 0px 0px #ff00008c, 5px 4px 6px #ff00008c",
            marginBottom: 2,
            WebkitTextStroke: "4px white",
            pointerEvents: "none",
          }}>
          Galaxy spaceship
        </Typography>
        <Button
          className="main-page__play-btn"
          variant="contained"
          endIcon={<PlayArrowIcon />}
          size="large"
          onClick={handleNavigate}>
          Play
        </Button>
      </Box>
    </MainLayout>
  );
};
