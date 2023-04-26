import { UserProfile } from "@/entities/user/model/types";
import { AvatarForm } from "@/features/Profile/change-avatar/types";
import { PasswordForm } from "@/features/Profile/change-password/types";

export const initialAvatarForm: AvatarForm = {
  avatar: undefined,
};

export const initialPasswordForm: PasswordForm = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

export const initialProfileForm: UserProfile = {
  email: "",
  login: "",
  first_name: "",
  second_name: "",
  display_name: "",
  phone: "",
};
