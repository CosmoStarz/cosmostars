import { LS_isLogged } from "./types";

export const logOut = () => {
  localStorage.setItem("isLogged", LS_isLogged.NO);
};
