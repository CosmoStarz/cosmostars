export type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponse = {
  data: SignUpData;
};

type SignUpData = {
  id: number;
};
export type SignInRequest = {
  login: string;
  password: string;
};
export type SignInResponse = {
  error: SignInData;
};
type SignInData = {
  data: string;
};
