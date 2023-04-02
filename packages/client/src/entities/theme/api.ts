import { internalApi } from "@/shared/api/internalApi";
import { HTTPMethods, InternalTags } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";

import { ThemeCreationData, ThemeData } from "./types";

const themeApi = internalApi.injectEndpoints({
  endpoints: builder => ({
    getUserTheme: builder.query<ThemeData, number>({
      query: (id: number) => ({
        url: `/theme/${id}`,
        method: HTTPMethods.GET,
      }),
      providesTags: [InternalTags.THEME],
    }),
    postUserTheme: builder.mutation<ThemeData, ThemeCreationData>({
      query: ({ id, theme }: ThemeCreationData) => ({
        url: `/theme/${id}`,
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
