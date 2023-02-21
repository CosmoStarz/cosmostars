import { yandexApi } from "../../../shared/api/yandexApi";
import {
  LEADERBOARD_API_ENDPOINT,
  TEAM_NAME,
  RATING_FIELD,
} from "../../../shared/constants/leaderboard";
import {
  AddLeaderboardEntryMutation,
  GetTeamLeaderboardQuery,
  LeaderboardResponse,
  LeaderData,
} from "./types";

const leaderboardApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    getLeaderboard: builder.query<LeaderData[], GetTeamLeaderboardQuery>({
      query: ({ offset, perPage }) => ({
        url: `/${LEADERBOARD_API_ENDPOINT}/${TEAM_NAME}`,
        method: "POST",
        body: {
          ratingFieldName: RATING_FIELD,
          cursor: offset,
          limit: perPage,
        },
      }),
      transformResponse(response: LeaderboardResponse) {
        return response.map(item => item.data);
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
      invalidatesTags: ["Leaderboard"],
    }),
  }),
});

export const { useGetLeaderboardQuery, useAddLeaderboardEntryMutation } =
  leaderboardApi;
