import axios from "axios";
import type { RequestHandler } from "express";

import { BaseStatuses, ErrorMessages, YANDEX_URL } from "../constants";
import type { YandexUserType } from "../constants/types";
import { configureError } from "../utils/configureError";

export const axiosInstance = axios.create({
  baseURL: YANDEX_URL,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});
export const checkAuthMiddleware: RequestHandler = async (req, res, next) => {
  axiosInstance
    .get<YandexUserType>(`${YANDEX_URL}/api/v2/auth/user`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    .then(res => {
      req.user = res.data;
      next();
    })
    .catch(() => {
      configureError(res, BaseStatuses.NOT_AUTH, ErrorMessages.NOT_AUTH);
    });
};
