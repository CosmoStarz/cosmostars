import { Router } from "express";

import { checkAuthMiddleware } from "../middlewares";
import themeRouter from "./ThemeRoutes";
import topicRouter from "./TopicRoutes";
const ApiRouter = Router();

ApiRouter.use("/theme", checkAuthMiddleware, themeRouter);
ApiRouter.use("/topics", checkAuthMiddleware, topicRouter);

export { ApiRouter };
