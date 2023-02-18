import { FC } from "react";
import { Container } from "@mui/material";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Forum } from "@/widgets/Forum/Forum";

export const ForumPage: FC = () => {
  return (
    <MainLayout>
      <Container sx={{ mt: "9.375%", mb: "6.45%" }}>
        <Forum />
      </Container>
    </MainLayout>
  );
};
