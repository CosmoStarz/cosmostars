import * as yup from "yup";

import { ERROR_MESSAGES } from "@/shared/constants/error-messages";

export const ChangeAvatarSchema = yup.object().shape({
  avatar: yup.string().required(ERROR_MESSAGES.REQUIRED_MSG),
});
