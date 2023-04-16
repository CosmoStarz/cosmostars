import type { RequestHandler } from "express";

import { BaseStatuses } from "../constants";
import { Comment } from "../db/models/Comment";
import { Like } from "../db/models/Like";

export const createComment: RequestHandler = async (req, res) => {
  const comment = await Comment.create({ ...req.body });
  return res.status(BaseStatuses.CREATED).json(comment);
};

export const getByTopicId: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const comments: Comment[] = await Comment.findAll({
    raw: true,
    include: {
      model: Like,
      attributes: ["user_id"],
      where: {
        user_id: req.user.id,
      },
      required: false,
    },
    where: { topic_id: id },
    order: [
      ["id", "ASC"],
      ["parent_id", "ASC NULLS FIRST"],
    ],
  });

  return res.status(BaseStatuses.OK).json(commentsToTree2(comments));
};

function commentsToTree2(list: Comment[]) {
  const map: Record<number, number> = {};
  let node: Comment;
  const roots = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i].id] = i;
    list[i].replies = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent_id !== null) {
      list[map[node.parent_id]].replies.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
