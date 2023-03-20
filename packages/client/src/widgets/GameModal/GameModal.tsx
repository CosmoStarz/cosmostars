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

import {
  resetScore,
  setGameStatus,
} from "@/entities/game/model/store/gameSlice";
import {
  gameModalSelector,
  gameScoreSelector,
  gameStatusSelector,
} from "@/entities/game/model/store/selectors";
import { useAddLeaderboardEntryMutation } from "@/entities/leaderboard/api";
import { useGetUserQuery } from "@/entities/user/model/api";
import { GameModalImage } from "@/features/GameModalImage/GameModalImage";
import { MuteSound } from "@/features/MuteSound/MuteSound";
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
  const [addLeaderboardEntry] = useAddLeaderboardEntryMutation();
  const { data } = useGetUserQuery();

  const { id, first_name, display_name, email, avatar } = data || {};
  const nameForLeaderboard = display_name ? display_name : first_name;

  const { onStart, onResume } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(gameStatusSelector);
  const isOpen = useAppSelector(gameModalSelector);
  const config = GameModalConfig[status];
  const score = useAppSelector(gameScoreSelector);

  const handleStart = () => {
    if (config?.clearScoreOnStart) {
      dispatch(resetScore());
    }
    onStart();
  };

  const handleClose = () => {
    if (id && nameForLeaderboard && status === GameStatuses.LOOSE) {
      addLeaderboardEntry({
        img: avatar,
        email,
        playerId: id,
        name: nameForLeaderboard,
        score,
      });
    }

    config?.canBeResumed ? onResume() : handleStart();
  };

  const handleHomeNavigate = () => {
    if (id && nameForLeaderboard) {
      addLeaderboardEntry({
        img: avatar,
        email,
        playerId: id,
        name: nameForLeaderboard,
        score,
      });
    }
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
              Press F to toggle fullscreen.
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
            <MuteSound />
            <Button variant="contained" onClick={handleClose}>
              {config.startButton}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
