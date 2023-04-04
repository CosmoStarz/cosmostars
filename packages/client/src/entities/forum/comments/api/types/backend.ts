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
  comments_count: number;
  author_id: number;
  date: Date;
};

export type CommentsDataRequest = {
  comments: CommentDataRequest[];
  count: number;
};
