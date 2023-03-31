import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { SERVER_URL } from "../constants";
import { InternalTags } from "./types";

export const internalApi = createApi({
  reducerPath: "internalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    credentials: "include",
  }),
  tagTypes: [InternalTags.TOPICS, InternalTags.COMMENTS],
  endpoints: () => ({}),
});
