import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  ListItem,
  Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { forumApi } from "@/shared/constants/mocks";
import { configurePluralString } from "@/shared/utils/configurePluralString";

import { CommentForm } from "../CommentForm/CommentForm";
import { TypographyButton } from "../TypographyButton/TypographyButton";
import { TopicItemType } from "./types";

export const TopicItem: FC<TopicItemType> = props => {
  const {
    id,
    // TODO: убрать мок, когда прикрутим передачу юзера
    author = forumApi.getAuthor(),
    comments_count,
    description,
    title,
    likes_count,
    is_liked,
    isBordered,
    hasLink,
    canBeLiked,
    canBeReplied,
    onExpand = () => null,
  } = props;

  const [favourite, setFavourite] = useState<boolean>(is_liked ?? false);
  const [likesNumber, setLikesCount] = useState<number>(likes_count ?? 0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { display_name, login, avatar } = author;

  const handleChangeIsLike = () => {
    setFavourite(!favourite);
    setLikesCount(favourite ? likesNumber - 1 : likesNumber + 1);
  };

  const handleChangeFormVisible = () => {
    setShowForm(!showForm);
  };

  const replyButton = useMemo(() => {
    if (!canBeReplied) {
      return;
    }

    if (showForm) {
      return (
        <Button
          color="error"
          startIcon={<CloseIcon />}
          sx={{ ml: 1 }}
          onClick={handleChangeFormVisible}>
          Close
        </Button>
      );
    }

    return (
      <Button
        startIcon={<ReplyIcon />}
        sx={{ ml: 1 }}
        onClick={handleChangeFormVisible}>
        Answer
      </Button>
    );
  }, [canBeReplied, showForm]);

  const generateTitle = useMemo(() => {
    if (title && hasLink) {
      return (
        <CardActionArea component={Link} to={`/forum/${id}`}>
          <CardHeader
            title={
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
            }
          />
        </CardActionArea>
      );
    }

    return (
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
    );
  }, [title, id]);

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
      {generateTitle}
      <CardContent>{description}</CardContent>
      <CardActions>
        <TypographyButton
          icon={<CommentIcon color="disabled" />}
          title={configurePluralString("Comment", comments_count ?? 0)}
          onClick={onExpand}
        />
        {canBeLiked && (
          <TypographyButton
            icon={<FavoriteIcon color={favourite ? "error" : "disabled"} />}
            title={configurePluralString("Like", likesNumber)}
            onClick={handleChangeIsLike}
          />
        )}
        {replyButton}
      </CardActions>
      {showForm && <CommentForm parentId={id} />}
    </Card>
  );
};
