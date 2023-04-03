export enum ErrorMessages {
  INVALID_USER = "Invalid user id",
  EMPTY_BODY = "Body can`t be empty",
  USER_NOT_FOUND = "User not found",
  INVALID_THEME = "Invalid theme name",
  BASE_SERVER_ERROR = "Internal Server Error",
}

export enum BaseStatuses {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum ThemeModes {
  LIGHT = "light",
  DARK = "dark",
}
