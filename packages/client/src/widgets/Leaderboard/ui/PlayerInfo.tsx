import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import { FC } from "react";
import { PlayerData } from "./types";

type PlayerInfoProps = PlayerData;

export const PlayerInfo: FC<PlayerInfoProps> = ({ name, img, email }) => {
  return (
    <Card sx={{ bgcolor: "transparent" }} elevation={0}>
      <CardHeader
        sx={{ padding: 0 }}
        avatar={
          <Avatar src={img} alt={`${name} avatar`}>
            {name[0]}
          </Avatar>
        }
        title={name}
        subheader={email}
      />
    </Card>
  );
};
