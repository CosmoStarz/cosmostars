import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { sequelize } from "./db/db";

const app = express();
app.use(cors());
const port = Number(process.env.SERVER_PORT) || 3001;

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(e => console.error("Unable to connect to the database:", e));

app.get("/", (_, res) => {
  res.json("👋 Howdy from the server :)");
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
