import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { List, ListItem, ListItemIcon } from "@mui/material";
import { FC, useMemo } from "react";

import { playerLivesSelector } from "@/entities/game/model/store";
import {
  BaseGameColors,
  gameBorderWidth,
  PlayerLives,
} from "@/shared/constants";
import { useAppSelector } from "@/shared/hooks/store";

import { GameBlock } from "../GameBlock/GameBlock";
import { GameBlockPosition } from "../GameBlock/types";

export const LivesContainer: FC = () => {
  const lives = useAppSelector(playerLivesSelector);

  const healthArray = useMemo(() => {
    return [...Array(PlayerLives.MAX).keys()].map(item => (
      <ListItem key={item} sx={{ px: 1 }}>
        <ListItemIcon sx={{ minWidth: "auto" }}>
          {item + 1 <= lives ? (
            <FavoriteIcon
              color="error"
              sx={{
                stroke: BaseGameColors.WHITE,
                strokeWidth: gameBorderWidth,
              }}
            />
          ) : (
            <FavoriteBorderIcon color="disabled" />
          )}
        </ListItemIcon>
      </ListItem>
    ));
  }, [lives]);

  return (
    <GameBlock position={GameBlockPosition.RIGHT}>
      <List
        sx={{
          display: "flex",
          p: "0 4px",
        }}>
        {healthArray}
      </List>
    </GameBlock>
  );
};
