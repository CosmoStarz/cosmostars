import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { IEmojiData, IEmojiPickerProps } from "emoji-picker-react";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAddCommentMutation } from "@/entities/forum/comments/api";
import { useGetUserQuery } from "@/entities/user/model/api";
import { TopicItem } from "@/features/TopicItem/TopicItem";
import { RoutesName } from "@/shared/constants";
import { commentValidation } from "@/shared/constants/validationShemas";
import { useTopic } from "@/shared/hooks/useTopic";
import { MainLayout } from "@/shared/layouts/MainLayout";

let EmojiPicker: React.FC<IEmojiPickerProps> | undefined;
if (typeof window !== "undefined") {
  import("emoji-picker-react").then(_module => {
    EmojiPicker = _module.default;
  });
}

export const ForumTopicPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const forumId: number | null = id ? +id : null;
  const navigate = useNavigate();

  const { data: userData } = useGetUserQuery();
  const [addComment] = useAddCommentMutation();
  const {
    currentComments,
    currentTopic,
    getCurrentComments,
    getCurrentTopic,
    loading,
  } = useTopic();

  const handleNavigate = () => {
    navigate(RoutesName.NOT_FOUND);
  };

  useEffect(() => {
    if (forumId) {
      getCurrentTopic(forumId, handleNavigate);
      getCurrentComments(forumId);
    } else {
      navigate(RoutesName.NOT_FOUND);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentValidation,
    onSubmit: ({ comment }, helpers) => {
      if (userData && forumId) {
        addComment({ comment, topicId: forumId, authorId: userData.id });
        helpers.setFieldValue("comment", "");
      }
      setShowPicker(false);
    },
  });

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
  };

  const handlePicker = () => setShowPicker(val => !val);

  return (
    <MainLayout>
      {(!currentTopic && loading) ? (
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
              {showPicker && EmojiPicker && (
                <EmojiPicker onEmojiClick={onEmojiClick} />
              )}
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
            {currentComments.length ? (
              currentComments.map(comment => (
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
      )}
    </MainLayout>
  );
};
