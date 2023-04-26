import { AuthorOfTopicData } from "@/entities/forum/topics/api/types";

export type AddTopicRequest = {
  comment: string;
  topic_id: number;
  parent_id: number | null;
  author_id: number;
};

export type LikesFieldType = {
  user_id: number | null;
};

export type CommentDataRequest = {
  id: number;
  comment: string;
  topic_id: number;
  parent_id: number | null;
  author_id: number;
  author?: AuthorOfTopicData;
  creation_date: Date;
  replies: CommentDataRequest[];
  likes_count: number;
  likes: LikesFieldType;
};
