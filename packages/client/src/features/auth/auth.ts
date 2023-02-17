import { LS_IS_LOGGED_KEY } from "@/shared/constants/auth";

import { LS_isLoggedValues } from "./types";

export const logIn = () =>
  localStorage.setItem(LS_IS_LOGGED_KEY, LS_isLoggedValues.YES);

export const logOut = () => {
  localStorage.setItem(LS_IS_LOGGED_KEY, LS_isLoggedValues.NO);
};
