import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
export type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponse = {
  error: FetchBaseQueryError;
};

export type SignInRequest = {
  login: string;
  password: string;
};
export type SignInResponse = {
  error: SignInData;
  data: string;
};
type SignInData = { status: "CUSTOM_ERROR"; data?: unknown; error: string };
