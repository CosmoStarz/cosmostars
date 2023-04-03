import type express from "express";
import { ValidationChain, validationResult } from "express-validator";

import { BaseStatuses } from "../constants";

export const validate = (validations: ValidationChain[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(BaseStatuses.BAD_REQUEST).json({ errors: errors.array() });
  };
};
