import { Collapse } from "@mui/material";
import { FC, useState } from "react";

import { CommentFrameWidth, MinimizeWidth } from "@/shared/constants";

import { GenericList } from "../GenericList/GenericList";
import { TopicItem } from "../TopicItem/TopicItem";
import { commentConverter } from "./converter";
import { CommentComponentType } from "./types";

export const Comment: FC<CommentComponentType> = props => {
  const [open, setOpen] = useState(true);
  const children = props.replies;
  const hasChildren = children.length > 0;
  const convertedComment = commentConverter(props);
  const needWidth = props.width - MinimizeWidth;
  const newWidth =
    needWidth <= CommentFrameWidth.MIN ? CommentFrameWidth.MIN : needWidth;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <TopicItem
        canBeLiked
        canBeReplied
        key={convertedComment.id}
        isBordered
        {...convertedComment}
        onExpand={hasChildren ? handleClick : undefined}
      />
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <GenericList items={children} width={newWidth} renderItem={Comment} />
        </Collapse>
      )}
    </>
  );
};
