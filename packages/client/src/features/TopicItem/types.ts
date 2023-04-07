import { AuthorOfTopicData } from "@/entities/forum/topics/api/types";

export type TopicItemType = {
  id: number;
  isBordered?: boolean;
  header?: () => JSX.Element | null;
  author?: AuthorOfTopicData;
  description: string;
  comments_count?: number;
  likesCount?: number;
};
