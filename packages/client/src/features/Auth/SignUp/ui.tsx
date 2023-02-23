import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useFormik } from "formik";
import { PropsWithChildren } from "react";

import { CardView } from "@/shared/ui";

import { signUpSchema } from "../schemas/sign-up";
import { authTypes } from "@/shared/api";

export type SignUpProps = PropsWithChildren<{
  handleSignUp: (userForm: authTypes.SignUpRequest) => void;
}>;

export const SignUp = ({ handleSignUp }: SignUpProps) => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      login: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      //TODO мне не нравится как это выглядит, принимаю предложение на улучшение
      const userForm: authTypes.SignUpRequest = {
        first_name: values.name,
        second_name: "forYandexApi",
        login: values.login,
        email: values.email,
        password: values.password,
        phone: values.phone,
      };
      handleSignUp(userForm);
    },
  });

  const props = {
    className: "sign-up",
    title: "Sign up",
    handleSubmit: handleSubmit,
    fields: [
      {
        id: "email",
        label: "Email",
        name: "email",
        value: values.email,
        type: "email",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.email,
      },
      {
        id: "login",
        label: "Login",
        name: "login",
        value: values.login,
        type: "text",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.login,
      },
      {
        id: "name",
        label: "Name",
        name: "name",
        value: values.name,
        type: "text",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.name,
      },
      {
        id: "phone",
        label: "Phone",
        name: "phone",
        value: values.phone,
        type: "text",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.phone,
      },
      {
        id: "password",
        label: "Password",
        name: "password",
        value: values.password,
        type: "password",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.password,
      },
      {
        id: "confirmPassword",
        label: "Re-type password",
        name: "confirmPassword",
        value: values.confirmPassword,
        type: "password",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.confirmPassword,
      },
    ],
    btn: "sign up",
    icon: <ArrowBackRoundedIcon />,
  };
  return (
    <CardView
      handleSubmit={props.handleSubmit}
      className={props.className}
      title={props.title}
      fields={props.fields}
      buttonName={props.btn}
      icon={props.icon}
    />
  );
};
