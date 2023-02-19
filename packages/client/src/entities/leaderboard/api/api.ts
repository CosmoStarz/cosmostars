import { yandexApi } from "../../../shared/api/yandexApi";
import {
  LEADERBOARD_API_ENDPOINT,
  TEAM_NAME,
  RATING_FIELD,
} from "../../../shared/constants/leaderboard";
import { GetTeamLeaderboardQuery, LeaderboardItemData } from "./types";

const leaderboardApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    getLeaderboard: builder.query<LeaderboardItemData, GetTeamLeaderboardQuery>(
      {
        query: ({ offset, perPage }) => ({
          url: `/${LEADERBOARD_API_ENDPOINT}/${TEAM_NAME}`,
          method: "POST",
          body: {
            ratingFieldName: RATING_FIELD,
            cursor: offset,
            limit: perPage,
          },
        }),
      }
    ),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;
