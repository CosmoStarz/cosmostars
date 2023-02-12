export type TopicItemType = {
  id: number;
  bordered?: boolean;
  header?: () => JSX.Element | null;
  author: string;
  avatar?: string;
  content: string;
  comments?: number;
  likes?: number;
};
