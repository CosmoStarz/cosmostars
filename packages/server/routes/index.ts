import { Router } from "express";

import { checkAuthMiddleware } from "../middlewares";
import commentRouter from "./CommentRoutes";
import themeRouter from "./ThemeRoutes";
import topicRouter from "./TopicRoutes";

const ApiRouter = Router();

ApiRouter.use("/theme", checkAuthMiddleware, themeRouter);
ApiRouter.use("/topics", checkAuthMiddleware, topicRouter);
ApiRouter.use("/comments", checkAuthMiddleware, commentRouter);

export { ApiRouter };
