import { PropsWithChildren } from "react";
import { useFormik } from "formik";
import { CardView } from "../../../shared/ui";
import { ChangePasswordSchema } from "../schemas/change-password";

export type ChangePasswordProps = PropsWithChildren<{
  handleChangePassword: () => void;
}>;
// { handleChangePassword }: ChangePasswordProps
export const ChangePassword = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      oldPassword: "1231123",
      password: "1231123",
      confirmPassword: "1231123",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: () => {
      // handleChangePassword();
    },
  });

  const props = {
    className: "change-password",
    title: "Password",
    handleSubmit: handleSubmit,
    fields: [
      {
        id: "oldPassword",
        label: "oldPassword",
        name: "oldPassword",
        value: values.oldPassword,
        type: "password",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.oldPassword,
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
    btn: "save",
  };
  return (
    <CardView
      handleSubmit={props.handleSubmit}
      className={props.className}
      title={props.title}
      fields={props.fields}
      buttonName={props.btn}
    />
  );
};