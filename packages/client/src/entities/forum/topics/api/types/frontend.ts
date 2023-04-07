export type AddTopicMutation = {
  title: string;
  description: string;
  authorId: number;
};

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
