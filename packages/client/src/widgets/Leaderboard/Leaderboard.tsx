import { Box, Button, Typography } from "@mui/material";
import { MouseEvent, FC, useCallback } from "react";
import {
  useAddLeaderboardEntryMutation,
  useGetLeaderboardQuery,
} from "../../entities/leaderboard/api";
import { Table } from "./ui";

const generateRandomUserInfo = () => {
  const num = Math.floor(Math.random() * 1000);

  return { playerId: num, name: `User${num}`, email: `user${num}@email.com` };
};

export const Leaderboard: FC = () => {
  const [addLeaderboardEntry] = useAddLeaderboardEntryMutation();

  const { data } = useGetLeaderboardQuery({
    offset: 0,
    perPage: 10,
  });
  console.log(data);

  // * Временно для добавления / обновления записей пока не реализован соответствующий функционал
  const onAddScoreButtonClick = useCallback(
    (evt: MouseEvent) => {
      evt.preventDefault();

      const score = Number(prompt("Enter player score:", "0"));

      addLeaderboardEntry({ ...generateRandomUserInfo(), score });
    },
    [addLeaderboardEntry]
  );

  return (
    <Box
      sx={{
        bgcolor: "red",
        width: "100%",
        background:
          "linear-gradient(126.97deg, rgba(6, 11, 40, 0.26) 28.26%, rgba(10, 14, 35, 0.42) 91.2%)",
        backdropFilter: "blur(60px)",
        borderRadius: "20px",
        px: "1.35%",
        pt: "2.69%",
        pb: "5.61%",
      }}>
      <Typography
        component="h1"
        sx={{
          mb: "1.72%",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "45px",
          lineHeight: "63px",
          color: " #fff",
        }}>
        Leader Board
      </Typography>
      {/* Временно для добавления / обновления записей пока не реализован соответствующий функционал */}
      <Button onClick={onAddScoreButtonClick} sx={{ backgroundColor: "white" }}>
        Добавить / обновить очки
      </Button>
      {/* ---------------------------- */}
      <Box sx={{ width: "100%" }}>{data && <Table data={data} />}</Box>
    </Box>
  );
};
