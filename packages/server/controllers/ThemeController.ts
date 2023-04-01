import type { Request, RequestHandler, Response } from "express";

import { BaseStatuses, ErrorMessages, ThemeModes } from "../constants";
import { Theme } from "../db/models/Theme";
import { configureError } from "../utils/configureError";

export const getThemeByUser: RequestHandler = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  if (!id) {
    return configureError(
      response,
      BaseStatuses.BAD_REQUEST,
      ErrorMessages.INVALID_USER
    );
  }

  try {
    const theme: Theme | null = await Theme.findOne({
      where: {
        user_id: id,
      },
    });

    if (!theme) {
      return configureError(
        response,
        BaseStatuses.NOT_FOUND,
        ErrorMessages.USER_NOT_FOUND
      );
    }

    return response.status(BaseStatuses.OK).json(theme);
  } catch (error) {
    return configureError(response);
  }
};

export const createThemeToUser: RequestHandler = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  if (!request.body) {
    return configureError(
      response,
      BaseStatuses.BAD_REQUEST,
      ErrorMessages.EMPTY_BODY
    );
  }

  if (!id) {
    return configureError(
      response,
      BaseStatuses.BAD_REQUEST,
      ErrorMessages.INVALID_USER
    );
  }

  const { theme } = request.body;

  if (!Object.values(ThemeModes).includes(theme)) {
    return configureError(
      response,
      BaseStatuses.BAD_REQUEST,
      ErrorMessages.INVALID_THEME
    );
  }

  try {
    const [userTheme] = await Theme.findOrCreate({
      where: { user_id: id },
      defaults: { user_id: id, ...theme },
    });
    userTheme.set({ theme: theme });
    userTheme.save();

    return response.status(BaseStatuses.OK).json(userTheme);
  } catch (error) {
    return configureError(response);
  }
};
