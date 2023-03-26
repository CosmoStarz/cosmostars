import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  Button,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetOneTopicQuery } from "@/entities/forum/api/forumApi";
import { TopicItem } from "@/features/TopicItem/TopicItem";
import { RoutesName } from "@/shared/constants";
import { commentValidation } from "@/shared/constants/validationShemas";
import { MainLayout } from "@/shared/layouts/MainLayout";

export const ForumTopicPage: FC = () => {
  const currentUrl = useLocation();
  const forumId: string = currentUrl.pathname.match("[^/]+$")![0];
  const { data, isLoading, isError } = useGetOneTopicQuery(forumId);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentValidation,
    onSubmit: values => {
      console.log(values);
    },
  });

  if (isError) {
    navigate(RoutesName.NOT_FOUND);
  }

  const topicItemProps = data
    ? {
        id: data.id,
        author: data.author,
        description: data.description,
      }
    : undefined;

  const checkedComments = data ? data.comments : [];

  const handleNavigateForum = () => {
    navigate(RoutesName.FORUM);
  };

  return (
    <MainLayout>
      {isLoading && (
        <Typography variant="h5" textAlign="center">
          Loading...
        </Typography>
      )}

      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          width: "80%",
          my: 2,
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
            {data?.title}
          </Typography>
        </Box>
        {topicItemProps && <TopicItem {...topicItemProps} />}
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            width: "95%",
            my: 2,
          }}>
          <TextField
            fullWidth
            id="comment"
            name="comment"
            label="Comment"
            onChange={formik.handleChange}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            helperText={formik.touched.comment && formik.errors.comment}
            multiline
            rows={2}
            sx={{
              mb: 2,
            }}
          />
          <Button variant="contained" size="large" type="submit">
            Comment
          </Button>
        </Box>
        <List
          sx={{
            width: "100%",
            overflowY: "auto",
          }}>
          {checkedComments.length ? (
            checkedComments.map(comment => (
              <TopicItem
                description={comment.comment}
                key={comment.id}
                isBordered
                {...comment}
              />
            ))
          ) : (
            <Typography variant="h6" textAlign="center">
              No comments yet...
            </Typography>
          )}
        </List>
      </Paper>
    </MainLayout>
  );
};
