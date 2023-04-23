export const AUTH = "/auth/";
export const OAUTH = "/oauth/yandex";
export const THEME_ENDPOINT = "theme";
export const REDIRECT_URI = `http://${__SERVER_HOST__}:${__SERVER_PORT__}`;
export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
