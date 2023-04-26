import { Container } from "@mui/material";
import { FC } from "react";

import { MainLayout } from "@/shared/layouts/MainLayout";
import { Forum } from "@/widgets/Forum/Forum";

export const ForumPage: FC = () => {
  return (
    <MainLayout>
      <Container sx={{ my: "3%" }}>
        <Forum />
      </Container>
    </MainLayout>
  );
};
