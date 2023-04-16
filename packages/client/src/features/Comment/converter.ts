import { CommentDataRequest } from "@/entities/forum/comments/api/types";

export const commentConverter = (comment: CommentDataRequest) => ({
  id: comment.id,
  description: comment.comment,
  comments_count: comment.replies.length,
});
