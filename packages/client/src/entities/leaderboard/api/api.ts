import { yandexApi } from "../../../shared/api/yandexApi";
import {
  LEADERBOARD_API_ENDPOINT,
  TEAM_NAME,
  RATING_FIELD,
} from "../../../shared/constants/leaderboard";
import {
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
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;
