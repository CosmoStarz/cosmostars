import { AUTH, Method } from "@/shared/constants/api";

import { getErrorReason } from "../utils";
import { yandexApi } from "../yandexApi";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "./models";

const AUTH_URL = {
  SIGN_UP: `${AUTH}signup`,
  SIGN_IN: `${AUTH}signin`,
  LOGOUT: `${AUTH}logout`,
};

export const authApi = yandexApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: signUpRequest => ({
        url: AUTH_URL.SIGN_UP,
        method: Method.POST,
        body: signUpRequest,
        responseHandler: "content-type",
      }),
      transformErrorResponse(response) {
        return getErrorReason(response);
      },
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: signInRequest => ({
        url: AUTH_URL.SIGN_IN,
        method: Method.POST,
        body: signInRequest,
        responseHandler: "content-type",
      }),
      transformErrorResponse(response) {
        return getErrorReason(response);
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: AUTH_URL.LOGOUT,
        method: Method.POST,
        responseHandler: "content-type",
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } =
  authApi;
