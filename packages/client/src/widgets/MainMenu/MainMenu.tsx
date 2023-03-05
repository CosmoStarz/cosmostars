import { Box, List, Paper } from "@mui/material";
import { FC } from "react";

import { Logout } from "@/features/Auth/Logout";
import { MenuLink } from "@/features/MenuLink/MenuLink";
import { ThemeToggler } from "@/features/ThemeToggler/ThemeToggler";
import { MenuItems } from "@/shared/constants";
export const MainMenu: FC = () => {
  return (
    <Box
      data-testid="main-header"
      className="main-header"
      sx={{
        display: "flex",
      }}>
      <Box
        data-testid="main-menu"
        className="main-menu"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          pl: "10%",
        }}>
        <Paper
          variant="outlined"
          sx={{
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
        </Paper>
      </Box>
      <Box
        className="main-action"
        sx={{
          display: "flex",
          mr: "2%",
        }}>
        <Paper
          variant="outlined"
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background:
              "linear-gradient(126.97deg, rgba(6, 11, 40, 0.26) 28.26%, rgba(10, 14, 35, 0.42) 91.2%)",
            backdropFilter: "blur(21px)",
            borderRadius: 3,
          }}>
          <ThemeToggler />
          <Logout />
        </Paper>
      </Box>
    </Box>
  );
};
