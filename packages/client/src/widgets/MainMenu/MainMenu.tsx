import { Box, List, Paper } from "@mui/material";
import { FC } from "react";

import { MenuLink } from "@/features/MenuLink/MenuLink";
import { MenuItems } from "@/shared/constants";

const paperStyleBase = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const MainMenu: FC = () => {
  return (
    <Box
      data-testid="main-header"
      className="main-header"
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
      }}>
      <Paper sx={paperStyleBase}>
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
  );
};
