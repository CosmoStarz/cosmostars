import { CommentDataRequest } from "@/entities/forum/comments/api/types";

export const commentConverter = (comment: CommentDataRequest) => ({
  id: comment.id,
  description: comment.comment,
  author: comment.author,
  comments_count: comment.replies.length,
  likes_count: comment.likes_count,
  is_liked: !!comment.likes?.user_id,
});
