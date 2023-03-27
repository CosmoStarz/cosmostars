import { Paper } from "@mui/material";
import { FC } from "react";

import { Logout } from "@/features/Auth/Logout";
import { ThemeToggler } from "@/features/ThemeToggler/ThemeToggler";
import { useAuth } from "@/shared/hooks/useAuth";

const paperStyleActions = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "absolute",
  right: "2%",
  mt: 2,
  py: "14px",
};

export const AdditionalMenu: FC = () => {
  const { isAuth } = useAuth();

  return (
    <Paper sx={paperStyleActions}>
      <ThemeToggler />
      {isAuth && <Logout />}
    </Paper>
  );
};
