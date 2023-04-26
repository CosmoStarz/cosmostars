import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { BasicLayout } from "@/shared/layouts/BasicLayout";
export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <BasicLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          my: "auto",
          height: "70%",
          width: "100%",
        }}>
        <Typography component="h1" className="main-page__name">
          Oops...Error!
        </Typography>
        <Button variant="contained" size="large" onClick={handleNavigate}>
          Back
        </Button>
      </Box>
    </BasicLayout>
  );
};
