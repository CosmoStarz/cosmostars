export type AddTopicRequest = {
  comment: string;
  topic_id: number;
  parent_id: number | null;
  author_id: number;
};
