import { HTTPMethods, Tags } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { yandexApi } from "@/shared/api/yandexApi";
import {
  AUTH_API_BASIC,
  USER_API_BASIC,
  UserEndpoints,
} from "@/shared/config/index";

import { UserInfo, UserPassword, UserProfile } from "./types";

const userApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<UserInfo, void>({
      query: () => ({
        url: `/${AUTH_API_BASIC}/${USER_API_BASIC}`,
      }),
      providesTags: [Tags.USER],
    }),

    changeProfile: builder.mutation<UserInfo, Partial<UserProfile>>({
      query: body => ({
        url: `/${USER_API_BASIC}/${UserEndpoints.PROFILE}`,
        method: HTTPMethods.PUT,
        body,
      }),
      transformErrorResponse: response => getErrorReason(response),
      invalidatesTags: [Tags.USER],
    }),

    changePassword: builder.mutation<undefined, UserPassword>({
      query: body => ({
        url: `/${USER_API_BASIC}/${UserEndpoints.PASSWORD}`,
        method: HTTPMethods.PUT,
        body,
        responseHandler: "content-type",
      }),
      transformErrorResponse: response => getErrorReason(response),
    }),

    changeAvatar: builder.mutation<UserInfo, FormData>({
      query: body => ({
        url: `/${USER_API_BASIC}/${UserEndpoints.PROFILE}/${UserEndpoints.AVATAR}`,
        method: HTTPMethods.PUT,
        body,
      }),
      transformErrorResponse: response => getErrorReason(response),
      invalidatesTags: [Tags.USER],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useChangeProfileMutation,
  useChangePasswordMutation,
  useChangeAvatarMutation,
} = userApi;
