import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";

import { useAuth } from "@/shared/hooks/useAuth";
export const Logout = () => {
  const { logoutAuth } = useAuth();
  return (
    <IconButton
      aria-label="brightness4icon"
      size="small"
      sx={{
        mx: 2,
      }}
      onClick={logoutAuth}>
      <LogoutIcon/>
    </IconButton>
  );
};
