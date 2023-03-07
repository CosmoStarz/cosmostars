import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit/dist";

import { RootState } from "@/app/store/types";
import { UserInfo } from "@/entities/user/model/types";

type InitialState = {
  isAuth: boolean;
  user: UserInfo | undefined;
};

const initialState: InitialState = {
  isAuth: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },
    setUser(state, { payload }: PayloadAction<UserInfo | undefined>) {
      state.user = payload;
    },
    resetAuth(state) {
      state.user = undefined;
      state.isAuth = false;
    },
  },
});

export const { setIsAuth, setUser, resetAuth } = authSlice.actions;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const authReducer = authSlice.reducer;
