import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types";
import { API_URL } from "@/shared/config";

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
