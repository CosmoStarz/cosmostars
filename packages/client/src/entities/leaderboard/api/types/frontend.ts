// * Types for usage in frontend application
export type GetTeamLeaderboardQuery = {
  offset: number;
  limit: number;
};

export type AddLeaderboardEntryMutation = LeaderData;

// Object that will add as leaderboard entry
export type LeaderData = {
  playerId: number;
  name: string;
  img?: string | null;
  email?: string;
  score: number;
};
