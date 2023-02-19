import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { leaderboardData } from "../../data/leaderboard";
import { useGetLeaderboardQuery } from "../../entities/leaderboard/api";
import { Table } from "./ui";

export const Leaderboard: FC = () => {
  const leaderboardQueryData = useGetLeaderboardQuery({
    offset: 0,
    perPage: 10,
  });
  console.log(leaderboardQueryData);

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
        <Table data={leaderboardData} />
      </Box>
    </Box>
  );
};
