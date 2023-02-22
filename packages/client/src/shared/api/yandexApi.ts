import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "../config";
import { Tags } from "./types";

export const yandexApi = createApi({
  reducerPath: "yandexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: [Tags.LEADERBOARD],
  endpoints: () => ({}),
});
