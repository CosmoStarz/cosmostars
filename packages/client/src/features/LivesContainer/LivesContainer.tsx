import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { List, ListItem, ListItemIcon } from "@mui/material";
import { FC, useMemo } from "react";

import { playerLivesSelector } from "@/entities/game/model/store";
import { maxPlayerLives } from "@/shared/constants";
import { useAppSelector } from "@/shared/hooks/store";

export const LivesContainer: FC = () => {
  const lives = useAppSelector(playerLivesSelector);
  const array = [...Array(maxPlayerLives).keys()];

  const healthArray = useMemo(() => {
    return array.map(item => (
      <ListItem key={item} sx={{ pl: 0 }}>
        <ListItemIcon sx={{ minWidth: "auto" }}>
          {item + 1 <= lives ? (
            <FavoriteIcon color="error" sx={{ fontSize: 30 }} />
          ) : (
            <FavoriteBorderIcon color="disabled" sx={{ fontSize: 30 }} />
          )}
        </ListItemIcon>
      </ListItem>
    ));
  }, [lives]);

  return (
    <List
      sx={{
        display: "flex",
        position: "fixed",
        top: "10px",
        right: "5px",
      }}>
      {healthArray}
    </List>
  );
};
