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
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const TopicItem: FC<TopicItemType> = props => {
  const { id, author, avatar, commentsCount, content, likesCount, isBordered } =
    props;
  const [favourite, setFavourite] = useState(false);
  const [likesNumber, setLikesCount] = useState(likesCount ?? 0);

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
      <CardHeader
        avatar={
          <Avatar sx={{ width: 48, height: 48 }} alt={author} src={avatar} />
        }
        title={<Typography variant="h6">{author}</Typography>}
      />
      <CardContent>{content}</CardContent>
      <CardActions>
        <TypographyButton
          icon={<CommentIcon color="disabled" />}
          title={`${commentsCount ?? 0} Comments`}
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
