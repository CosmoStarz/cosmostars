import { Router } from "express";
import { body } from "express-validator";

import { ErrorMessages } from "../constants";
import { createComment } from "../controllers/CommentController";
import { validate } from "../middlewares/validation";

const commentRouter = Router();

commentRouter.post(
  "/",
  validate([
    body("comment", "comment - минимум 2 символа").isLength({ min: 2 }),
    body(["topic_id", "author_id"], ErrorMessages.NOT_EMPTY).exists(),
    body(["topic_id", "author_id"], ErrorMessages.IS_NUMERIC).isNumeric(),
    body("parent_id", ErrorMessages.IS_NUMERIC)
      .isNumeric()
      .optional({ nullable: true }),
  ]),
  createComment
);

export default commentRouter;
