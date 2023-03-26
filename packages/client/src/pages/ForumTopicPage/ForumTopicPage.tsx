import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
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
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TopicItem } from "@/features/TopicItem/TopicItem";
import { RoutesName } from "@/shared/constants";
import { forumApi } from "@/shared/constants/mocks";
import { commentValidation } from "@/shared/constants/validationShemas";
import { MainLayout } from "@/shared/layouts/MainLayout";

export const ForumTopicPage: FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentValidation,
    onSubmit: values => {
      console.log(values);
      setShowPicker(false);
    },
  });
  const comments = forumApi.getTopic();
  const authorTopic = forumApi.getAuthor();
  const handleNavigateForum = () => {
    navigate(RoutesName.FORUM);
  };
  const [showPicker, setShowPicker] = useState(false);
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();

  const onEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => {
    setChosenEmoji(emojiObject); // нужно для ререндера компонента, инчае поле комментариев обновляется, только после закрытия эмоджи
    /* eslint-disable  @typescript-eslint/no-non-null-assertion */
    formik.values.comment = formik.values.comment + emojiObject!.emoji;
    console.log(formik.values.comment);
  };
  const handlePicker = () => setShowPicker(val => !val);
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
            {authorTopic.title}
          </Typography>
        </Box>
        <TopicItem {...authorTopic} />
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
            value={formik.values.comment}
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
          <Box>
            <IconButton onClick={handlePicker}>
              <EmojiEmotionsIcon sx={{ position: "relative" }} />
            </IconButton>
            {showPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
            <Button variant="contained" size="large" type="submit">
              Comment
            </Button>
          </Box>
        </Box>
        <List
          sx={{
            width: "100%",
            overflowY: "auto",
          }}>
          {comments.map(item => (
            <TopicItem key={item.id} isBordered {...item} />
          ))}
        </List>
      </Paper>
    </MainLayout>
  );
};
