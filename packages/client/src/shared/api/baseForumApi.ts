import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

import { REDIRECT_URI } from "../constants/api";
import { Tags } from "./types";

export const baseForumApi = createApi({
  reducerPath: "forumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: REDIRECT_URI,
    credentials: "include",
  }),
  tagTypes: [Tags.FORUM],
  endpoints: () => ({}),
});
