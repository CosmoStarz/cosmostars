import { AuthorOfTopicData } from "@/entities/forum/topics/api/types";

export type AddCommentMutation = {
  comment: string;
  topicId: number;
  parentId?: number;
  authorId: number;
};

export type CommentData = {
  id: number;
  comment: string;
  topic_id: number;
  parent_id: number | null;
  comments_count: number;
  author: AuthorOfTopicData;
  date: Date;
};

export type CommentsData = {
  comments: CommentData[];
  count: number;
};
