// * Types for usage in frontend application
export type GetTeamLeaderboardQuery = {
  offset: number;
  perPage: number;
};

export type LeaderData = {
  playerId: number;
  score: number;
};
