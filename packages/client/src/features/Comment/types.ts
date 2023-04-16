import { CommentDataRequest } from "@/entities/forum/comments/api/types";

export type CommentComponentType = {
  width: number;
} & CommentDataRequest;
