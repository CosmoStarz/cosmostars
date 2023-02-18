import { PropsWithChildren } from "react";
import { useFormik } from "formik";
import { CardView } from "../../../shared/ui";
import { signInSchema } from "../schemas/sign-in";
import { RoutesName } from "@/shared/constants";

export type SignInProps = PropsWithChildren<{
  handleSignIn: () => void;
}>;

export const SignIn = ({ handleSignIn }: SignInProps) => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: () => {
      handleSignIn();
    },
  });
  console.log(errors);
  const props = {
    className: "sign-in",
    title: "Login",
    handleSubmit: handleSubmit,
    fields: [
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
        id: "password",
        label: "Password",
        name: "password",
        value: values.password,
        type: "password",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.password,
      },
    ],
    btn: "sign in",
    link: "Create account?",
  };
  return (
    <CardView
      handleSubmit={props.handleSubmit}
      className={props.className}
      title={props.title}
      fields={props.fields}
      buttonName={props.btn}
      linkName={props.link}
      linkHref={RoutesName.REGISTRATION}
    />
  );
};
