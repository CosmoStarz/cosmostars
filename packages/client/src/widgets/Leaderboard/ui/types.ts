export type PlayerData = {
  playerId: number;
  name: string;
  img?: string | null;
  email?: string;
};

export type RowData = PlayerData & {
  place: number;
  score: number;
};
