import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

import { useAuth } from "@/shared/hooks/useAuth";
export const Logout = () => {
  // const { logoutAuth } = useAuth();
  // eslint-disable-next-line
  const logoutAuth = () => {};
  return (
    <IconButton
      aria-label="logout-icon"
      size="small"
      sx={{
        mx: 2,
      }}
      onClick={logoutAuth}>
      <LogoutIcon />
    </IconButton>
  );
};
