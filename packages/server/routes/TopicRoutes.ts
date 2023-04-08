import { Router } from "express";
import { body } from "express-validator";

import {
  createTopic,
  getAllTopic,
  getTopicById,
} from "../controllers/TopicController";
import { numberParameter } from "../middlewares/numberParameter";
import { validate } from "../middlewares/validation";

const topicRouter = Router();

topicRouter.post(
  "/",
  validate([
    body("title", "title - минимум 2 символа").isLength({ min: 2 }),
    body("description", "description - минимум 2 символа").isLength({ min: 2 }),
    body("author_id", "не может быть пустым").exists(),
    body("author_id", "только числовой id").isNumeric(),
  ]),
  createTopic
);

topicRouter.get("/", getAllTopic);

topicRouter.get("/:id", numberParameter("id"), getTopicById);

export default topicRouter;
