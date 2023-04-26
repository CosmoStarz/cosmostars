import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Box, Paper, Tab, Tabs } from "@mui/material";
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
    <Paper className="form-paper" sx={{ my: "3%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example">
          <Tab label="Profile" icon={<PersonRoundedIcon />} />
          <Tab label="Pasword" icon={<HttpsRoundedIcon />} />
          <Tab label="Avatar" icon={<InsertPhotoRoundedIcon />} />
        </Tabs>
      </Box>
      <Box>
        {value === 0 && <ChangeProfileForm />}
        {value === 1 && <ChangePasswordForm />}
        {value === 2 && <ChangeAvatarForm />}
      </Box>
    </Paper>
  );
}
