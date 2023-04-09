import { Router } from "express";
import { body } from "express-validator";

import { ErrorMessages } from "../constants";
import { getByTopicId } from "../controllers/CommentController";
import {
  createTopic,
  getAllTopic,
  getTopicById,
} from "../controllers/TopicController";
import { numberParameter } from "../middlewares/numberParameter";
import { validate } from "../middlewares/validation";

const router = Router();

router.post(
  "/",
  validate([
    body("title", "title - минимум 2 символа").isLength({ min: 2 }),
    body("description", "description - минимум 2 символа").isLength({ min: 2 }),
    body("author_id", ErrorMessages.NOT_EMPTY).exists(),
    body("author_id", ErrorMessages.IS_NUMERIC).isNumeric(),
  ]),
  createTopic
);

router.get("/", getAllTopic);

router.get("/:id", numberParameter("id"), getTopicById);

router.get("/:id/comments", numberParameter("id"), getByTopicId);

export default router;
