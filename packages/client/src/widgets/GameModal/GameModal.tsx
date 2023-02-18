import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GameModalImage } from "@/features/GameModalImage/GameModalImage";
import {
  BaseGameColors,
  GameModalImageAlign,
  RoutesName,
} from "@/shared/constants";

import { GameModalProps } from "./types";

export const GameModal: FC<
  GameModalProps & { onStart: () => void }
> = props => {
  const {
    title,
    startButton,
    canBeResumed,
    rulesVisibility,
    scoreVisibility,
    rightImg,
    leftImg,
    onStart,
  } = props;
  const navigate = useNavigate();
  // TODO: передавать score через селектор, после реализации redux в рамках задачи добавления score (задача COS-63)
  const score = 0;

  // TODO: доработать логику открытия-закрытия, когда добавим состояния игры с redux (задача COS-47)
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    // TODO: метод остановки/паузы игры (задача COS-47)
    canBeResumed ? null : onStart();
  };

  const handleHomeNavigate = () => {
    setOpen(false);
    navigate(RoutesName.MAIN);
  };

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      open={open}
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
      <DialogTitle variant="h2" component="h1">
        {title}
      </DialogTitle>
      {rightImg && (
        <GameModalImage image={rightImg} type={GameModalImageAlign.RIGHT} />
      )}
      {scoreVisibility && (
        <Typography variant="h5" component="p" color={BaseGameColors.PURPLE}>
          Your score: {score}
        </Typography>
      )}
      {rulesVisibility && (
        <DialogContentText>
          Press &#11160; and &#11162; to move spaceship. Press Space key to
          shoot.
          <br />
          Press Esc key to paused the game.
          <br />
          Good luck!
        </DialogContentText>
      )}
      {leftImg && (
        <GameModalImage image={leftImg} type={GameModalImageAlign.LEFT} />
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
          {startButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
