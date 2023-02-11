import * as yup from "yup";

const EMAIL_ERROR_MSG = "Пожалуйста, введите email в правильном формате";
const REQUIRED_MSG = "Это поле обязательно";
const PASSWORD_ERROR_MSG = "Пожалуйста, введите пароль от 5 символов";
const CONFIRM_ERROR_MSG = "Пароли должны совпадать";
const NAME_ERROR_MSG = "Должно быть более трех символов";
const PHONE_ERROR_MSG = "Неверный формат";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const authSchema = yup.object().shape({
  email: yup.string().email(EMAIL_ERROR_MSG).required(REQUIRED_MSG),
  phone: yup.string().matches(phoneRegExp, PHONE_ERROR_MSG),
  password: yup
    .string()
    .min(5, PASSWORD_ERROR_MSG)
    .required(REQUIRED_MSG),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], CONFIRM_ERROR_MSG)
    .required(REQUIRED_MSG),
  login: yup.string().min(3, NAME_ERROR_MSG).required(REQUIRED_MSG),
  name: yup.string().min(3, NAME_ERROR_MSG).required(REQUIRED_MSG),
});
