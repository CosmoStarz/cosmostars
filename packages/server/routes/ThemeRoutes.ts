import { Router } from "express";

import {
  createThemeToUser,
  getThemeByUser,
} from "../controllers/ThemeController";

const themeRouter = Router();

themeRouter.get("/:id", getThemeByUser).post("/:id", createThemeToUser);

export default themeRouter;
