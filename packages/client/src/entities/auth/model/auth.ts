import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store/types";

type AuthState = {
  isLogged: boolean | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { isLogged: false } as AuthState,
  reducers: {
    setCredentials: state => {
      state.isLogged = true;
    },
  },
});
export const { setCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectIsLogged = (state: RootState) => state.auth.isLogged;
