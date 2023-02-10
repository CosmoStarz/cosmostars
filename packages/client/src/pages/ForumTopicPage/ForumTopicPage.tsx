import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { TopicItem } from "../../features/TopicItem/TopicItem";
import { commentValidation } from "../../shared/constants/validationShemas";
import { authorMock, topicMock } from "../../shared/constants/mocks";
import { MainLayout } from "../../shared/layouts/MainLayout";
import { RoutesName } from "../../shared/constants";
import ReplyIcon from "@mui/icons-material/Reply";

export const ForumTopicPage: FC = () => {
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

  const handleNavigateForum = () => {
    navigate(RoutesName.FORUM);
  };

  return (
    <MainLayout>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          width: "80%",
          margin: "auto",
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
            {authorMock.title}
          </Typography>
        </Box>
        <TopicItem {...authorMock} />
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
            overflowY: "scroll",
          }}>
          {topicMock.map(item => (
            <TopicItem key={item.id} bordered {...item} />
          ))}
        </List>
      </Paper>
    </MainLayout>
  );
};
