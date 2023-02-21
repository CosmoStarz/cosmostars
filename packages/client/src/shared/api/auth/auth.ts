import { SignUpRequest, SignUpResponse, SignInRequest } from "./models";
import { api } from "./base";

enum AUTH_URL {
  SIGN_UP = "/auth/signup",
  SIGN_IN = "/auth/signin",
  USER = "/auth/user",
  LOGOUT = "/auth/logout",
}

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: signUpRequest => ({
        url: AUTH_URL.SIGN_UP,
        method: "POST",
        body: signUpRequest,
      }),
    }),
    signIn: builder.mutation<SignUpRequest, SignInRequest>({
      query: signInRequest => ({
        url: AUTH_URL.SIGN_IN,
        method: "POST",
        body: signInRequest,
      }),
    }),
    getUser: builder.query<null, SignUpRequest>({
      query: () => ({
        url: AUTH_URL.USER,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: AUTH_URL.LOGOUT,
        method: "POST",
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
