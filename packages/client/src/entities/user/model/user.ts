import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "@/shared/config";

import { User } from "./types";

export const authApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth`,
    credentials: "include",
  }),
  endpoints: builder => ({
    getUserInfo: builder.query<User, void>({
      query: () => "/user",
    }),
  }),
});
export const { useGetUserInfoQuery } = authApi;
