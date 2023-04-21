import type { RequestHandler } from "express";

import { BaseStatuses } from "../constants";
import { Like } from "../db/models/Like";

export const createLike: RequestHandler = async (req, res) => {
  const like = await Like.create({ ...req.body, user_id: req.user.ya_id });
  return res.status(BaseStatuses.CREATED).json(like);
};

export const deleteLike: RequestHandler = async (req, res) => {
  const { comment_id } = req.body;
  await Like.destroy({
    where: {
      user_id: req.user.ya_id,
      comment_id: comment_id,
    },
    individualHooks: true,
  });
  return res.status(BaseStatuses.OK).json();
};
