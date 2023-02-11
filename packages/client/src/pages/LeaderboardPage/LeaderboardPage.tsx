import { Container } from "@mui/material";
import { FC } from "react";
import { MainLayout } from "../../shared/layouts/MainLayout";
import { Leaderboard } from "../../widgets/Leaderboard";

export const LeaderboardPage: FC = () => {
  return (
    <MainLayout>
      <Container sx={{ mt: "135px", mb: "93px" }}>
        <Leaderboard />
      </Container>
    </MainLayout>
  );
};
