import { ErrorResponse } from "@/shared/api/types";
import { getErrorReason } from "@/shared/api/utils";
import { yandexApi } from "@/shared/api/yandexApi";
import {
  LEADERBOARD_API_ENDPOINT,
  RATING_FIELD,
  TEAM_NAME,
} from "@/shared/constants/leaderboard";

import {
  AddLeaderboardEntryMutation,
  GetTeamLeaderboardQuery,
  LeaderboardResponse,
  LeaderData,
} from "./types";

const leaderboardApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    getLeaderboard: builder.query<LeaderData[], GetTeamLeaderboardQuery>({
      query: ({ offset, limit }) => ({
        url: `/${LEADERBOARD_API_ENDPOINT}/${TEAM_NAME}`,
        method: "POST",
        body: {
          ratingFieldName: RATING_FIELD,
          cursor: offset,
          limit,
        },
      }),
      transformResponse(response: LeaderboardResponse) {
        return response.map(item => item.data);
      },
      transformErrorResponse(response) {
        return getErrorReason(response);
      },
      providesTags: ["Leaderboard"],
    }),

    addLeaderboardEntry: builder.mutation<
      undefined,
      AddLeaderboardEntryMutation
    >({
      query: leaderData => ({
        url: `/${LEADERBOARD_API_ENDPOINT}`,
        method: "POST",
        body: {
          data: leaderData,
          ratingFieldName: RATING_FIELD,
          teamName: TEAM_NAME,
        },
      }),
      // ? WTF By commenting this out,
      // ? I fixed the bug with not auto-refetching leaderboard after adding a new entry
      // transformErrorResponse(response) {
      //   return getErrorReason(response);
      // },
      invalidatesTags: ["Leaderboard"],
    }),
  }),
});

export const { useGetLeaderboardQuery, useAddLeaderboardEntryMutation } =
  leaderboardApi;
