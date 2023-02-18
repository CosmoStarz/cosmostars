import { Link,ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

import { LinkComponentType } from "./types";

export const MenuLink: FC<LinkComponentType> = props => {
  const { title, icon, path = "" } = props.link;

  return (
    <Link to={path} component={RouterLink} underline="none">
      <ListItem
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}>
        <ListItemText
          sx={{
            maxWidth: "max-content",
            marginRight: "4px",
          }}
          primary={title}
        />
        <ListItemIcon>{icon}</ListItemIcon>
      </ListItem>
    </Link>
  );
};
