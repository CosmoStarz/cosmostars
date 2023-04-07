import { internalApi } from "@/shared/api/internalApi";
import { HTTPMethods, InternalTags } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { THEME_ENDPOINT } from "@/shared/constants/api";

import { ThemeCreationData, ThemeData } from "./types";

const themeApi = internalApi.injectEndpoints({
  endpoints: builder => ({
    getUserTheme: builder.query<ThemeData, number>({
      query: (id: number) => ({
        url: `/${THEME_ENDPOINT}/${id}`,
        method: HTTPMethods.GET,
      }),
      providesTags: [InternalTags.THEME],
    }),
    postUserTheme: builder.mutation<ThemeData, ThemeCreationData>({
      query: ({ id, theme }: ThemeCreationData) => ({
        url: `/${THEME_ENDPOINT}/${id}`,
        method: HTTPMethods.POST,
        body: { theme },
      }),
      transformErrorResponse(response) {
        return getErrorReason(response);
      },
      invalidatesTags: [InternalTags.THEME],
    }),
  }),
});

export const { useLazyGetUserThemeQuery, usePostUserThemeMutation } = themeApi;
