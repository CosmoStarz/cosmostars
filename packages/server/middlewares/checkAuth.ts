import axios from "axios";
import type { RequestHandler } from "express";

import { BaseStatuses, ErrorMessages, YANDEX_URL } from "../constants";
import type { YandexUserType } from "../constants/types";
import { User } from "../db/models/User";
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
    .then(async res => {
      const [user] = await User.findOrCreate({
        where: { ya_id: res.data.id },
        defaults: {
          login: res.data.login,
          display_name: res.data.display_name,
          avatar: res.data.avatar,
        },
      });

      req.user = user;
      next();
    })
    .catch(() => {
      configureError(res, BaseStatuses.NOT_AUTH, ErrorMessages.NOT_AUTH);
    });
};
