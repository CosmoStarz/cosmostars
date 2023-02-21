// * Types for usage in frontend application
export type GetTeamLeaderboardQuery = {
  offset: number;
  perPage: number;
};

export type AddLeaderboardEntryMutation = LeaderData;

// Object that will add as leaderboard entry
export type LeaderData = {
  playerId: number;
  name: string;
  img?: string;
  email?: string;
  score: number;
};
