import { Router } from "express";
import { body } from "express-validator";

import { ErrorMessages } from "../constants";
import { createLike, deleteLike } from "../controllers/LikeController";
import { validate } from "../middlewares/validation";

const likeRouter = Router();

likeRouter.post(
  "/",
  validate([
    body(["comment_id"], ErrorMessages.NOT_EMPTY).exists(),
    body(["comment_id"], ErrorMessages.IS_NUMERIC).isNumeric(),
  ]),
  createLike
);
likeRouter.delete(
  "/",
  validate([
    body(["comment_id"], ErrorMessages.NOT_EMPTY).exists(),
    body(["comment_id"], ErrorMessages.IS_NUMERIC).isNumeric(),
  ]),
  deleteLike
);

export default likeRouter;
