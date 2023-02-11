export type PlayerData = {
  name: string;
  img?: string;
  email?: string;
};

export type RowData = PlayerData & {
  score: number;
  status: "online" | "offline";
  lastGameDate: string;
};
