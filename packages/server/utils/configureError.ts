import type { Response } from "express";

import { BaseStatuses, ErrorMessages } from "../constants/index";

export const configureError = (
  response: Response,
  code?: BaseStatuses,
  str?: ErrorMessages
) => {
  const error = str ?? ErrorMessages.BASE_SERVER_ERROR;
  const status = code ?? BaseStatuses.SERVER_ERROR;

  return response.status(status).json({ reason: error });
};
