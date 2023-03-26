import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ListItem,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

import { TypographyButton } from "../TypographyButton/TypographyButton";
import { TopicItemType } from "./types";

export const TopicItem: FC<TopicItemType> = props => {
  const {
    id,
    author,
    comments_count,
    description,
    likesCount,
    isBordered,
    header = () => null,
  } = props;
  const [favourite, setFavourite] = useState(false);
  const [likesNumber, setLikesCount] = useState(likesCount ?? 0);
  const { display_name, login, avatar } = author;

  const handleChangeIsLike = () => {
    setFavourite(!favourite);
    setLikesCount(favourite ? likesNumber - 1 : likesNumber + 1);
  };

  return (
    <Card
      component={ListItem}
      sx={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        mt: 2,
        mx: "auto",
        alignItems: "flex-start",
        overflow: "visible",
        backgroundImage: "none",
        boxShadow: "none",
      }}
      key={id}
      variant={isBordered ? "outlined" : "elevation"}>
      {header()}
      <CardHeader
        avatar={
          <Avatar
            sx={{ width: 48, height: 48 }}
            src={avatar ?? undefined}
            alt={`${login} avatar`}>
            {login[0]}
          </Avatar>
        }
        title={<Typography variant="h6">{display_name ?? login}</Typography>}
      />
      <CardContent>{description}</CardContent>
      <CardActions>
        <TypographyButton
          icon={<CommentIcon color="disabled" />}
          title={`${comments_count ?? 0} Comments`}
        />
        <TypographyButton
          icon={<FavoriteIcon color={favourite ? "error" : "disabled"} />}
          title={`${likesNumber} Likes`}
          onClick={handleChangeIsLike}
        />
      </CardActions>
    </Card>
  );
};
