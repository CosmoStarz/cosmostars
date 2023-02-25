import { AUTH, Method } from "@/shared/constants/api";

import { yandexApi } from "../yandexApi";
import { SignInRequest, SignUpRequest, SignUpResponse } from "./models";

const AUTH_URL = {
  SIGN_UP: `${AUTH}signup`,
  SIGN_IN: `${AUTH}signin`,
  USER: `${AUTH}user`,
  LOGOUT: `${AUTH}logout`,
};

export const authApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: signUpRequest => ({
        url: AUTH_URL.SIGN_UP,
        method: Method.POST,
        body: signUpRequest,
      }),
    }),
    signIn: builder.mutation<SignUpRequest, SignInRequest>({
      query: signInRequest => ({
        url: AUTH_URL.SIGN_IN,
        method: Method.POST,
        body: signInRequest,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: AUTH_URL.USER,
        method: Method.GET,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: AUTH_URL.LOGOUT,
        method: Method.POST,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApi;
