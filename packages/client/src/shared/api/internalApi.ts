import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../constants";
import { Tags } from "./types";

export const internalApi = createApi({
  reducerPath: "internalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: () => ({}),
});
