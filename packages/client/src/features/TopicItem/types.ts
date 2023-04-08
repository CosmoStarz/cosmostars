import { AuthorOfTopicData } from "@/entities/forum/topics/api/types";

export type TopicItemType = {
  id: number;
  isBordered?: boolean;
  hasLink?: boolean;
  title?: string;
  author?: AuthorOfTopicData;
  description: string;
  comments_count?: number;
  likes_count?: number;
  is_liked?: boolean;
  canBeLiked?: boolean;
  canBeReplied?: boolean;
  onExpand?: () => void;
};
