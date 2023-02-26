export type UserInfo = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type UserProfile = {
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
};

export type UserPassword = {
  oldPassword: string;
  newPassword: string;
};
