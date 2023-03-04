import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit/dist";

import { RootState } from "@/app/store/types";
import { UserInfo } from "@/entities/user/model/types";

type InitialState = {
  isAuth: boolean;
  user: UserInfo | undefined;
  isLoadingAuth: boolean;
};

const initialState: InitialState = {
  isAuth: false,
  user: undefined,
  isLoadingAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },
    setUser(state, { payload }: PayloadAction<UserInfo>) {
      state.user = payload;
    },
    setIsLoadingAuth(state, { payload }: PayloadAction<boolean>) {
      state.isLoadingAuth = payload;
    },
  },
});

export const { setIsAuth, setUser, setIsLoadingAuth } = authSlice.actions;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const authReducer = authSlice.reducer;
