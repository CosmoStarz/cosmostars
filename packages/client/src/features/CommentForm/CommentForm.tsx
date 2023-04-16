import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { IEmojiData, IEmojiPickerProps } from "emoji-picker-react";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import { useAddCommentMutation } from "@/entities/forum/comments/api";
import { useGetUserQuery } from "@/entities/user/model/api";
import { commentValidation } from "@/shared/constants/validationShemas";

import { CommentFormType } from "./types";

let EmojiPicker: React.FC<IEmojiPickerProps> | undefined;
if (typeof window !== "undefined") {
  import("emoji-picker-react").then(_module => {
    EmojiPicker = _module.default;
  });
}

export const CommentForm: FC<CommentFormType> = ({ parentId }) => {
  const { id } = useParams<{ id: string }>();
  const forumId: number | null = id ? +id : null;

  const { data: userData } = useGetUserQuery();
  const [addComment] = useAddCommentMutation();

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentValidation,
    onSubmit: ({ comment }, helpers) => {
      if (userData && forumId) {
        addComment({
          comment,
          topicId: forumId,
          authorId: userData.id,
          parentId,
        });
        helpers.setFieldValue("comment", "", false);
      }
      setShowPicker(false);
    },
  });

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
  );
};
