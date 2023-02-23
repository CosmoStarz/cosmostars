import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { setGameStatus } from "@/entities/game/model/store/gameSlice";
import {
  gameModalSelector,
  gameStatusSelector,
} from "@/entities/game/model/store/selectors";
import { GameModalImage } from "@/features/GameModalImage/GameModalImage";
import {
  BaseGameColors,
  GameModalConfig,
  GameModalImageAlign,
  GameStatuses,
  RoutesName,
} from "@/shared/constants";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/store";

import { GameModalType } from "./types";

export const GameModal: FC<GameModalType> = props => {
  const { onStart, onResume } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(gameStatusSelector);
  const isOpen = useAppSelector(gameModalSelector);
  const config = GameModalConfig[status];
  // TODO: передавать score через селектор, после реализации redux в рамках задачи добавления score (задача COS-63)
  const score = 0;

  const handleClose = () => {
    config?.canBeResumed ? onResume() : onStart();
  };

  const handleHomeNavigate = () => {
    dispatch(setGameStatus(GameStatuses.NOT_ACTIVE));
    navigate(RoutesName.MAIN);
  };

  return (
    <Dialog
      fullWidth
      open={isOpen}
      sx={{
        textAlign: "center",
      }}
      PaperProps={{
        sx: {
          padding: 4,
          height: "35%",
          display: "flex",
          justifyContent: "space-between",
          overflow: "inherit",
        },
      }}>
      {config && (
        <>
          <DialogTitle variant="h2" component="h1">
            {config.title}
          </DialogTitle>
          {config.rightImg && (
            <GameModalImage
              image={config.rightImg}
              type={GameModalImageAlign.RIGHT}
            />
          )}
          {config.scoreVisibility && (
            <Typography
              variant="h5"
              component="p"
              color={BaseGameColors.PURPLE}>
              Your score: {score}
            </Typography>
          )}
          {config.rulesVisibility && (
            <DialogContentText>
              Press &#11160; and &#11162; to move spaceship. Press Space key to
              shoot.
              <br />
              Press Esc key to paused the game.
              <br />
              Good luck!
            </DialogContentText>
          )}
          {config.leftImg && (
            <GameModalImage
              image={config.leftImg}
              type={GameModalImageAlign.LEFT}
            />
          )}
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}>
            <Button variant="contained" onClick={handleHomeNavigate}>
              Home page
            </Button>
            <Button variant="contained" onClick={handleClose}>
              {config.startButton}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
