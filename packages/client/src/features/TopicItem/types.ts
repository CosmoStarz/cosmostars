export type TopicItemType = {
  id: number;
  isBordered?: boolean;
  header?: () => JSX.Element | null;
  author: string;
  avatar?: string;
  content: string;
  commentsCount?: number;
  likesCount?: number;
};
