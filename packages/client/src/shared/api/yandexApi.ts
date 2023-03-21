import "cross-fetch/polyfill";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "../config";
import { Tags } from "./types";

export const yandexApi = createApi({
  reducerPath: "yandexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    fetchFn: fetch,
  }),
  tagTypes: [Tags.LEADERBOARD, Tags.USER],
  endpoints: () => ({}),
});
