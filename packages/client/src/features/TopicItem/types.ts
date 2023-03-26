import { AuthorOfTopicData } from "@/entities/forum/api/types/frontend";

export type TopicItemType = {
  id: number;
  isBordered?: boolean;
  header?: () => JSX.Element | null;
  author: AuthorOfTopicData;
  description: string;
  comments_count?: number;
  likesCount?: number;
};
