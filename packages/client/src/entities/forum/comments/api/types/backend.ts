export type AddTopicRequest = {
  comment: string;
  topic_id: number;
  parent_id: number | null;
  author_id: number;
};

export type CommentDataRequest = {
  id: number;
  comment: string;
  topic_id: number;
  parent_id: number | null;
  author_id: number;
  creation_date: Date;
  replies: CommentDataRequest[];
  likes_count: number;
  "likes.user_id": number | null;
};
