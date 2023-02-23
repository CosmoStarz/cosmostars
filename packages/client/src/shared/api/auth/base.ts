import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

import { RootState } from "../../../app/store/types";
import { API_URL } from "../../config";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const isLogged = (getState() as RootState).auth.isLogged;
    if (!isLogged) {
      headers.set("authorization", `Bearer 1`);
      return headers;
    }
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
});
