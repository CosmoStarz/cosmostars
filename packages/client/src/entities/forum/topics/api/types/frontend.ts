export type AddTopicMutation = {
  title: string;
  description: string;
  authorId: number;
};

export type AuthorOfTopicData = {
  ya_id: number;
  login: string;
  display_name?: string | null;
  avatar?: string | null;
};
