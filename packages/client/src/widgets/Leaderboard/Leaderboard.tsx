import { Box, Paper, Typography } from "@mui/material";
import { FC, useMemo } from "react";

import { useGetLeaderboardQuery } from "@/entities/leaderboard/api";
import { getRandomNumber } from "@/shared/utils/functions";

import { DEFAULT_PER_PAGE, ENTRIES_LIMIT, START_PAGE } from "./config";
import { Table } from "./ui";

export const Leaderboard: FC = () => {
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
    <Paper
      sx={{
        width: "100%",
        p: "5%",
      }}>
      <Typography variant="h3" component="h1">
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
    </Paper>
  );
};
