import * as yup from "yup";
import { ERROR_MESSAGES } from "@/shared/constants/error-messages";

export const signInSchema = yup.object().shape({
  password: yup
    .string()
    .min(5, ERROR_MESSAGES.PASSWORD_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  login: yup
    .string()
    .min(3, ERROR_MESSAGES.NAME_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
});
