import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MainLayout } from "../shared/layouts/MainLayout";
import { RoutesName } from "../shared/constants";

export const MainPage: FC = () => {
  const handleClick = () => {
    // TODO: после внедрения react-router сделать переход на страницу игры через useNavigate
    console.log(`Переход на ${RoutesName.GAME}`);
  };

  return (
    <MainLayout>
      <Box
        className="main-page"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
          width: "100%",
        }}>
        <Typography
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
          onClick={handleClick}>
          Play
        </Button>
      </Box>
    </MainLayout>
  );
};
