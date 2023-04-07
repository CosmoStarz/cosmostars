import type express from "express";

import { BaseStatuses, ErrorMessages } from "../constants";
import { configureError } from "../utils/configureError";

export const numberParameter = (paramName: string) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!isNaN(+req.params[paramName])) {
      return next();
    }
    configureError(res, BaseStatuses.NOT_FOUND, ErrorMessages.NOT_FOUND);
  };
};
