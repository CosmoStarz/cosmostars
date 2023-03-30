import { Router } from "express";

import {
  createTopic,
  getAllTopic,
  getTopicById,
} from "../controllers/TopicController";

const router = Router();

router.post("/", createTopic);

router.get("/", getAllTopic);

router.get("/:id", getTopicById);

export default router;
