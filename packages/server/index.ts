import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { sequelize } from "./db/db";
import topicRoutes from "./routes/TopicRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/topics", topicRoutes);
const port = Number(process.env.SERVER_PORT) || 3001;

app.get("/", (_, res) => {
  res.json("👋 Howdy from the server :)");
});

const start = async (): Promise<void> => {
  try {
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
