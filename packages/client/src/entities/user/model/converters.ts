import { AvatarForm } from "@/features/Profile/change-avatar/types";
import { PasswordForm } from "@/features/Profile/change-password/types";

import { UserPassword } from "./types";

export const passwordConverter = (data: PasswordForm): UserPassword => ({
  oldPassword: data.oldPassword,
  newPassword: data.password,
});

export const avatarConverter = (data: AvatarForm): FormData => {
  const formData = new FormData();
  formData.append("avatar", data.avatar!);

  return formData;
};
