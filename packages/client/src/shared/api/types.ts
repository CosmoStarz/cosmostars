export type ErrorResponse = {
  reason: string;
};

export enum HTTPMethods {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
  PATCH = "patch",
}

export enum Tags {
  LEADERBOARD = "Leaderboard",
}
