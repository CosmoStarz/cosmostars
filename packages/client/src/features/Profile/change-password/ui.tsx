import { useFormik } from "formik";

import { useChangePasswordMutation } from "@/entities/user/model/api";
import { passwordConverter } from "@/entities/user/model/converters";
import { initialPasswordForm } from "@/shared/constants/formInitials";

import { CardView } from "../../../shared/ui";
import { ChangePasswordSchema } from "../schemas/change-password";

export const ChangePasswordForm = () => {
  const [changePassword] = useChangePasswordMutation();
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialPasswordForm,
    validationSchema: ChangePasswordSchema,
    onSubmit: () => {
      const data = passwordConverter(values);
      changePassword(data);
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
