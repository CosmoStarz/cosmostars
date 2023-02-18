import { Box, List, Paper } from "@mui/material";
import { FC } from "react";

import { MenuLink } from "@/features/MenuLink/MenuLink";
import { ThemeToggler } from "@/features/ThemeToggler/ThemeToggler";
import { MenuItems } from "@/shared/constants";

export const MainMenu: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}>
      <Paper
        variant="outlined"
        sx={{
          width: "40%",
          marginTop: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            "linear-gradient(126.97deg, rgba(6, 11, 40, 0.26) 28.26%, rgba(10, 14, 35, 0.42) 91.2%)",
          backdropFilter: "blur(21px)",
          borderRadius: 3,
        }}>
        <List
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}>
          {MenuItems.map((item, index) => (
            <MenuLink link={item} key={index} />
          ))}
        </List>
        <ThemeToggler />
      </Paper>
    </Box>
  );
};
