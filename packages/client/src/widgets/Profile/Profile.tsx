import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Box, Tab, Tabs } from "@mui/material";
import { PropsWithChildren, useState } from "react";

import { ChangeAvatarForm } from "@/features/Profile/change-avatar";
import { ChangePasswordForm } from "@/features/Profile/change-password";
import { ChangeProfileForm } from "@/features/Profile/change-profile";

export type ProfileProps = PropsWithChildren<{
  handleProfile: () => void;
}>;

export function ProfileWidget({ handleProfile }: ProfileProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      className="change-settings"
      sx={{
        margin: "auto",
        maxWidth: "595px",
        width: "100%",
        border: "1px solid",
        background:
          "linear-gradient(152.97deg, rgba(0, 0, 0, 0.4655) 15.24%, rgba(0, 0, 0, 0.95) 115.24%) ",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example">
          <Tab
            sx={{ flexDirection: "row" }}
            label="Profile"
            icon={<PersonRoundedIcon />}
          />
          <Tab
            sx={{ flexDirection: "row" }}
            label="Pasword"
            icon={<HttpsRoundedIcon />}
          />
          <Tab
            sx={{ flexDirection: "row" }}
            label="Avatar"
            icon={<InsertPhotoRoundedIcon />}
          />
        </Tabs>
      </Box>
      <Box>
        {value === 0 && <ChangeProfileForm />}
        {value === 1 && <ChangePasswordForm />}
        {value === 2 && <ChangeAvatarForm />}
      </Box>
    </Box>
  );
}
