import * as yup from "yup";
import { ERROR_MESSAGES } from "../../../../shared/constants/error-messages";

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(5, ERROR_MESSAGES.PASSWORD_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  password: yup
    .string()
    .min(5, ERROR_MESSAGES.PASSWORD_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], ERROR_MESSAGES.CONFIRM_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
});
