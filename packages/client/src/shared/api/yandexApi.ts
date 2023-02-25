import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "../config";

export const yandexApi = createApi({
  reducerPath: "yandexApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  endpoints: () => ({}),
});
