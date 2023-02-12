export enum Status {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type PlayerData = {
  name: string;
  img?: string;
  email?: string;
};

export type RowData = PlayerData & {
  score: number;
  status: Status;
  lastGameDate: string;
};
