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
        <Typography
          component="h1"
          className="main-page__name"
          sx={{
            fontSize: "144px",
            letterSpacing: "0.01em",
            color: "transparent",
            textShadow:
              " 5px 4px 6px #011133, 0px 0px 0px #ff00008c, 5px 4px 6px #ff00008c",
            marginBottom: 1,
            WebkitTextStroke: "4px white",
            pointerEvents: "none",
          }}>
          Oops...Error!
        </Typography>
        <Button variant="contained" size="large" onClick={handleNavigate}>
          Back
        </Button>
      </Box>
    </BasicLayout>
  );
};
