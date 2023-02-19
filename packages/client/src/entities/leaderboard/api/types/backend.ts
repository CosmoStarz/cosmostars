import { LeaderData } from "./frontend";

// * Types for backend api server
export type LeaderboardItemData = LeaderData;

export type LeaderboardNewLeaderRequest = {
  data: LeaderboardItemData;
  ratingFieldName: string;
  teamName?: string;
};

export type LeaderboardRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type LeaderboardResponse = {
  data: LeaderboardItemData;
};
