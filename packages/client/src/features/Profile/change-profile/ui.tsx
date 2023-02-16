import { PropsWithChildren } from "react";
import { useFormik } from "formik";
import { CardView } from "../../../shared/ui";
import { ChangeProfileSchema } from "../schemas/change-profile";

export type ChangeProfileProps = PropsWithChildren<{
  handleChangeProfile: () => void;
}>;
// { handleChangeProfile }: ChangeProfileProps
export const ChangeProfile = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: "test@mail.ru",
      login: "testLogin",
      name: "testName",
      phone: "8800553535",
    },
    validationSchema: ChangeProfileSchema,
    onSubmit: () => {
      // handleChangeProfile();
    },
  });

  const props = {
    className: "change-profile",
    title: "Profile",
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
    ],
    btn: "Save",
  };
  return (
    <CardView
      // handleSubmit={props.handleSubmit}
      className={props.className}
      title={props.title}
      fields={props.fields}
      buttonName={props.btn}
    />
  );
};
