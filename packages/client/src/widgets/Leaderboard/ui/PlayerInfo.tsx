import { Avatar, Card, CardHeader } from "@mui/material";
import { FC } from "react";

import { PlayerData } from "./types";

type PlayerInfoProps = Omit<PlayerData, "playerId">;

export const PlayerInfo: FC<PlayerInfoProps> = ({ name, img, email }) => {
  return (
    <Card sx={{ background: "transparent", border: "none" }} elevation={0}>
      <CardHeader
        sx={{ padding: 0 }}
        avatar={
          <Avatar src={img ?? undefined} alt={`${name} avatar`}>
            {name[0]}
          </Avatar>
        }
        title={name}
        subheader={email}
      />
    </Card>
  );
};
