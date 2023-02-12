import { FC } from "react";
import { ListItem, ListItemIcon, ListItemText, Link } from "@mui/material";
import { LinkComponentType } from "./types";
import { Link as RouterLink } from "react-router-dom";

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
