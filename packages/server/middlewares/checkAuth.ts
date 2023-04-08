import axios, { AxiosError } from "axios";
import type { RequestHandler } from "express";

import { BaseStatuses, ErrorMessages,YANDEX_URL } from "../constants";
import type { YandexUserType } from "../constants/types";
import { configureError } from "../utils/configureError";

export const axiosInstance = axios.create({
  baseURL: YANDEX_URL,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});
// @ts-ignore
export const checkAuthMiddleware: RequestHandler = async (req, res, next) => {
  axiosInstance
    .get<YandexUserType>(`${YANDEX_URL}/api/v2/auth/user`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    .then(() => {
      next();
    })
    .catch((e: AxiosError) => {
      console.log(e.message);
      configureError(res, BaseStatuses.NOT_AUTH, ErrorMessages.NOT_AUTH);
      // res
      //   .status(e.status ?? 401)
      //   .set({ "Content-Type": "text/html" })
      //   .json({
      //     // @ts-ignore
      //     error: e.response?.data?.reason ?? e.message,
      //   });
    });
};
