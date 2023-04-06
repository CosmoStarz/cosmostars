import axios, { AxiosError } from "axios";
import { YANDEX_URL } from "constants";
import type { RequestHandler } from "express";
type YandexUserType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: null;
  email: string;
  phone: string;
};

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
    .then(() => {
      next();
    })
    .catch((e: AxiosError) => {
      res
        .status(e.status ?? 401)
        .set({ "Content-Type": "text/html" })
        .json({
          // @ts-ignore
          error: e.response?.data?.reason ?? e.message,
        });
    });
};
