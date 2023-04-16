import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetCommentsQuery } from "@/entities/forum/comments/api";
import { useGetOneTopicQuery } from "@/entities/forum/topics/api";
import { Comment } from "@/features/Comment/Comment";
import { CommentForm } from "@/features/CommentForm/CommentForm";
import { GenericList } from "@/features/GenericList/GenericList";
import { TopicItem } from "@/features/TopicItem/TopicItem";
import { RoutesName } from "@/shared/constants";
import { MainLayout } from "@/shared/layouts/MainLayout";

export const ForumTopicPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const forumId: number | null = id ? +id : null;
  const navigate = useNavigate();

  const { data: currentComments } = useGetCommentsQuery(forumId ?? 0, {
    skip: !forumId,
  });
  const { data: currentTopic, isFetching: loading } = useGetOneTopicQuery(
    forumId ?? 0,
    { skip: !forumId }
  );

  useEffect(() => {
    if (!forumId) {
      navigate(RoutesName.NOT_FOUND);
    }
  }, []);

  const handleNavigateForum = () => {
    navigate(RoutesName.FORUM);
  };

  return (
    <MainLayout>
      {!currentTopic && loading ? (
        <Box
          sx={{
            m: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography variant="h4" textAlign="center">
            Loading...
          </Typography>
          <CircularProgress />
        </Box>
      ) : (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            width: "80%",
            my: "3%",
            mx: "auto",
            padding: 3,
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}>
            <IconButton
              sx={{
                position: "absolute",
              }}
              onClick={handleNavigateForum}>
              <ReplyIcon />
            </IconButton>
            <Typography
              variant="h2"
              component="h1"
              className="topic-page__name"
              m={"auto"}>
              {currentTopic?.title}
            </Typography>
          </Box>
          {currentTopic && <TopicItem {...currentTopic} />}
          <CommentForm />
          {currentComments && currentComments.length ? (
            <GenericList items={currentComments} renderItem={Comment} />
          ) : (
            <Typography variant="h6" textAlign="center">
              No comments yet...
            </Typography>
          )}
        </Paper>
      )}
    </MainLayout>
  );
};
