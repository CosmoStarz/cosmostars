import { FC, useState } from "react";
import { Button, Dialog, DialogTitle, Box, Typography, DialogActions, DialogContentText } from "@mui/material";
import { GameModalProps } from "./types";
import { BaseGameColors } from "../../shared/constants";

export const GameModal: FC<GameModalProps> = (props) => {
    const { title, startButton, canBeResumed, rulesVisibility, scoreVisibility, rightImg, leftImg } = props;
    // TODO: передавать score через селектор, после реализации redux в рамках задачи добавления score (задача COS-63)
    const score = 0;

    // TODO: доработать логику открытия-закрытия, когда добавим состояния игры с redux (задача COS-47)
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        console.log(canBeResumed ? "Game resumed" : "Start new game");
        setOpen(false);
    };

    const handleHomeNavigate = () => {
        console.log("Navigate to /");
        handleClose();
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
            variant: "outlined",
            sx: {
                padding: 4,
                height: "35%",
                display: "flex",
                justifyContent: "space-between",
                overflow: "inherit",
            }
        }}
    >
        <DialogTitle variant="h2" component="h1">{title}</DialogTitle>
        {rightImg &&
            <Box
                sx={{
                    background: `no-repeat center/contain url(${rightImg})`,
                    position: "absolute",
                    top: "-30%",
                    right: "-15%",
                    width: "250px",
                    height: "250px",
                }}
            />
        }
        {scoreVisibility &&
            <Typography variant="h5" component="p" color={BaseGameColors.PURPLE}>
                Your score: {score}
            </Typography>
        }
        {rulesVisibility &&
            <DialogContentText>
                Press &#11160; and &#11162; to move spaceship. Press Space key to shoot.
                <br />
                Press Esc key to paused the game.
                <br />
                Good luck!
            </DialogContentText>
        }
        {leftImg &&
            <Box
                sx={{
                    background: `no-repeat center/contain url(${leftImg})`,
                    position: "absolute",
                    bottom: "-30%",
                    left: "-15%",
                    width: "250px",
                    height: "250px",
                }}
            />
        }
        <DialogActions
            sx={{
                display: "flex",
                justifyContent: "space-around",
            }}
        >
            <Button variant="contained" onClick={handleHomeNavigate}>Home page</Button>
            <Button variant="contained" onClick={handleClose}>{startButton}</Button>
        </DialogActions>
    </Dialog>
  );
};
