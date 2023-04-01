export type TopicsData = {
  count: number;
  topics: TopicItemData[];
};

export type TopicItemData = {
  id: number;
  title: string;
  description: string;
  author: AuthorOfTopicData;
  creation_date: Date;
  comments_count: number;
};

export type AuthorOfTopicData = {
  id: number;
  login: string;
  display_name?: string | null;
  avatar?: string | null;
};

export type CommentData = {
  id: number;
  comment: string;
  topic_id: number;
  parent_id: number | null;
  comments_count: number
  author: AuthorOfTopicData;
  date: Date;
};

export type TopicData = {
  comments: CommentData[];
} & TopicItemData;

export type CommentsData = {
  comments: CommentData[]
  count: number
}
