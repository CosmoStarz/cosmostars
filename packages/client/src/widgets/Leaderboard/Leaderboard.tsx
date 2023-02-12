import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { RowData, Status, Table } from "./ui";

const leaderboardData: RowData[] = [
  {
    name: "Esthera Jackson",
    email: "esthera@simmmple.com",
    score: 10000,
    status: Status.ONLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
  {
    name: "Alexa Liras",
    email: "alexa@simmmple.com",
    img: "https://via.placeholder.com/40",
    score: 10000,
    status: Status.OFFLINE,
    lastGameDate: "14/06/21",
  },
];

export const Leaderboard: FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "red",
        width: "100%",
        background:
          "linear-gradient(126.97deg, rgba(6, 11, 40, 0.26) 28.26%, rgba(10, 14, 35, 0.42) 91.2%)",
        backdropFilter: "blur(60px)",
        borderRadius: "20px",
        px: "18px",
        pt: "36px",
        pb: "75px",
      }}>
      <Typography
        component="h1"
        sx={{
          mb: "23px",
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
