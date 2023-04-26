import { AuthorOfTopicData } from "./frontend";

export type AddTopicRequest = {
  title: string;
  description: string;
  author_id: number;
};

export type TopicsDataRequest = {
  count: number;
  topics: TopicItemDataRequest[];
};

export type TopicItemDataRequest = {
  id: number;
  title: string;
  description: string;
  author?: AuthorOfTopicData;
  author_id: number;
  creation_date: Date;
  comments_count: number;
};
