import { Button, Typography } from "@mui/material";

import { useOAuth } from "./utils";
export const YandexOAuth = () => {
  const { handleYandexOAuth } = useOAuth();
  return (
    <Button
      sx={{
        mb: 2,
      }}
      onClick={handleYandexOAuth}>
      <Typography>Enter with Yandex</Typography>
    </Button>
  );
};
