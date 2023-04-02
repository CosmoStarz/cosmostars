import { Router } from "express";
import { body } from "express-validator";

import {
  createTopic,
  getAllTopic,
  getTopicById,
} from "../controllers/TopicController";
import { validate } from "../middlewares/validation";

const router = Router();

router.post(
  "/",
  validate([
    body("title", "title - минимум 2 символа").isLength({ min: 2 }),
    body("description", "description - минимум 2 символа").isLength({ min: 2 }),
    body("author_id", "author_id - только числовой id").exists().isNumeric(),
  ]),
  createTopic
);

router.get("/", getAllTopic);

router.get("/:id", getTopicById);

export default router;
