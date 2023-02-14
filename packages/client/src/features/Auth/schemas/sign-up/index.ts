import * as yup from "yup";
import { ERROR_MESSAGES } from "../../../../shared/constants/error-messages";
import { VALDIATION_REGEX } from "../../../../shared/constants/validation-regex";

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email(ERROR_MESSAGES.EMAIL_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  phone: yup
    .string()
    .matches(VALDIATION_REGEX.phoneRegExp, ERROR_MESSAGES.PHONE_ERROR_MSG),
  password: yup
    .string()
    .min(5, ERROR_MESSAGES.PASSWORD_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], ERROR_MESSAGES.CONFIRM_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  login: yup
    .string()
    .min(3, ERROR_MESSAGES.NAME_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
  name: yup
    .string()
    .min(3, ERROR_MESSAGES.NAME_ERROR_MSG)
    .required(ERROR_MESSAGES.REQUIRED_MSG),
});
