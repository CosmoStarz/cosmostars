import { LS_isLogged } from "./types";

export const logIn = () => localStorage.setItem("isLogged", LS_isLogged.YES);
