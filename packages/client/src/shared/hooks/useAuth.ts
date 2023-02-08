import { LS_IS_LOGGED_KEY } from "./../constants/auth";

export const useAuth = () => {
  return Boolean(Number(localStorage.getItem(LS_IS_LOGGED_KEY)));
};
