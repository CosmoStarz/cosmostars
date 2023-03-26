import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

import { baseUrl } from "../constants";
import { Tags } from "./types";

export const baseForumApi = createApi({
  reducerPath: "forumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  tagTypes: [Tags.FORUM],
  endpoints: () => ({}),
});
