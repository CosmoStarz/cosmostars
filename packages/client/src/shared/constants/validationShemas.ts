import * as yup from "yup";

export const commentValidation = yup.object({
  comment: yup
    .string()
    .min(1, "Comment should be of minimum 1 characters length")
    .required("Comment is required"),
});
