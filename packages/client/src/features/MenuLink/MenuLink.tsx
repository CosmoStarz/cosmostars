import { FC } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { LinkComponentType } from "./types";

export const MenuLink: FC<LinkComponentType> = props => {
  const { title, icon, path } = props.link;

  const handleClick = () => {
    // TODO: после внедрения rect-router добавить метод перехода через useNavigate
    console.log(`Переход на ${path}`);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={handleClick}>
      <ListItemText
        sx={{
          maxWidth: "max-content",
          marginRight: "4px",
        }}
        primary={title}
      />
      <ListItemIcon>{icon}</ListItemIcon>
    </ListItem>
  );
};
