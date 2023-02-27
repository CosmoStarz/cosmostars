import { LeaderData } from "./frontend";

// * Types for backend api server
export type LeaderboardNewLeaderRequest = {
  data: LeaderData;
  ratingFieldName: string;
  teamName?: string;
};

export type LeaderboardRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type LeaderboardResponse = {
  data: LeaderData;
}[];
