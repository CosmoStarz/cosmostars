import { Router } from "express";

import { checkAuthMiddleware } from "../middlewares";
import themeRouter from "./ThemeRoutes";

const ApiRouter = Router();

ApiRouter.use("/theme", checkAuthMiddleware, themeRouter);

export { ApiRouter };
