import type { RequestHandler } from "express";

import { Topic } from "../db/models/Topic";

export const createTopic: RequestHandler = async (req, res) => {
  console.log("req.body", req.body);
  const topic = await Topic.create({ ...req.body });
  return res.status(200).json(topic);
};

export const getAllTopic: RequestHandler = async (_req, res) => {
  const allTopics: Topic[] = await Topic.findAll();
  const topicCount: number = await Topic.count();
  return res.status(200).json({ count: topicCount, topics: allTopics });
};

export const getTopicById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const topic: Topic | null = await Topic.findByPk(id);
  return res
    .status(200)
    .json({ message: "Topic fetched successfully", data: topic });
};
