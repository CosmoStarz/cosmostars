import { useFormik } from "formik";
import { useEffect, useState } from "react";

import {
  useChangeProfileMutation,
  useGetUserQuery,
} from "@/entities/user/model/api";
import { UserProfile } from "@/entities/user/model/types";
import { initialProfileForm } from "@/shared/constants/formInitials";

import { CardView } from "../../../shared/ui";
import { ChangeProfileSchema } from "../schemas/change-profile";

export const ChangeProfileForm = () => {
  const [changeProfile] = useChangeProfileMutation();
  const { data } = useGetUserQuery();
  const [initValues, setInitValues] = useState<UserProfile>(initialProfileForm);

  useEffect(() => {
    if (data) {
      setInitValues(data);
    }
  }, [data]);

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: initValues,
    validationSchema: ChangeProfileSchema,
    onSubmit: values => {
      changeProfile(values);
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
        id: "first_name",
        label: "Name",
        name: "first_name",
        value: values.first_name,
        type: "text",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.first_name,
      },
      {
        id: "second_name",
        label: "Second name",
        name: "second_name",
        value: values.second_name,
        type: "text",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.second_name,
      },
      {
        id: "display_name",
        label: "Display name",
        name: "display_name",
        value: values.display_name ?? "",
        type: "text",
        onChange: handleChange,
        onBlur: handleBlur,
        error: errors.display_name,
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
      handleSubmit={props.handleSubmit}
      className={props.className}
      title={props.title}
      fields={props.fields}
      buttonName={props.btn}
    />
  );
};
