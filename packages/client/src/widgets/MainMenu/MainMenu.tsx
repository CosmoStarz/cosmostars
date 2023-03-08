import { Box, List, Paper } from "@mui/material";
import { FC } from "react";

import { Logout } from "@/features/Auth/Logout";
import { MenuLink } from "@/features/MenuLink/MenuLink";
import { ThemeToggler } from "@/features/ThemeToggler/ThemeToggler";
import { MenuItems } from "@/shared/constants";

const paperStyleBase = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background:
          "linear-gradient(126.97deg, rgba(6, 11, 40, 0.26) 28.26%, rgba(10, 14, 35, 0.42) 91.2%)",
      backdropFilter: "blur(21px)",
      borderRadius: 3,
}
const paperStyleActions = {
  ...paperStyleBase,
  position: "absolute",
  right: "2%",
  height: "100%",
}
export const MainMenu: FC = () => {
  return (
    <Box
      data-testid="main-header"
      className="main-header"
      sx={{
        mt: 2,
        display: "flex",
        position: "relative",
        justifyContent: "center",
      }}>
        <Paper
          variant="outlined"
          sx={paperStyleBase}>
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
        <Paper
          variant="outlined"
          sx={paperStyleActions}>
          <ThemeToggler />
          <Logout />
        </Paper>
    </Box>
  );
};
