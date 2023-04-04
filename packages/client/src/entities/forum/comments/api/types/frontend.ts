export type AddCommentMutation = {
  comment: string;
  topicId: number;
  parentId?: number;
  authorId: number;
};
