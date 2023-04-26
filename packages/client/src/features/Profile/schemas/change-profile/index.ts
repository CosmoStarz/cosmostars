import * as yup from "yup";

import { ERROR_MESSAGES } from "@/shared/constants/error-messages";
import { VALDIATION_REGEX } from "@/shared/constants/validation-regex";

export const ChangeProfileSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.EMAIL_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  login: yup
    .string()
    .min(3, ERROR_MESSAGES.NAME_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  phone: yup
    .string()
    .matches(VALDIATION_REGEX.phoneRegExp, ERROR_MESSAGES.PHONE_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  first_name: yup
    .string()
    .min(3, ERROR_MESSAGES.NAME_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  second_name: yup
    .string()
    .min(3, ERROR_MESSAGES.NAME_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  display_name: yup
    .string()
    .min(3, ERROR_MESSAGES.NAME_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
});
