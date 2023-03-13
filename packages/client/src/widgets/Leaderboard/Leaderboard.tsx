import { Box, Button, Typography } from "@mui/material";
import { FC, MouseEvent, useCallback, useMemo } from "react";

import {
  useAddLeaderboardEntryMutation,
  useGetLeaderboardQuery,
} from "@/entities/leaderboard/api";
import { getRandomNumber } from "@/shared/utils/functions";

import { DEFAULT_PER_PAGE, ENTRIES_LIMIT, START_PAGE } from "./config";
import { Table } from "./ui";
import { generateRandomUserInfo } from "./utils";

export const Leaderboard: FC = () => {
  const [addLeaderboardEntry] = useAddLeaderboardEntryMutation();

  const { data } = useGetLeaderboardQuery({
    offset: START_PAGE,
    limit: ENTRIES_LIMIT,
  });

  const dataWithPlaces = useMemo(
    () =>
      data?.map((entry, index) => ({
        ...entry,
        place: index + 1,
        // Временно, пока не везде есть playerId (он используется как key в списке строк)
        playerId: entry.playerId ?? getRandomNumber(0, 1000),
      })),
    [data]
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

      <Box sx={{ width: "100%" }}>
        {dataWithPlaces && (
          <Table
            data={dataWithPlaces}
            startPage={START_PAGE}
            defaultPerPage={DEFAULT_PER_PAGE}
          />
        )}
      </Box>
    </Box>
  );
};
