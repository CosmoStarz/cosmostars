import * as yup from "yup";

export const commentValidation = yup.object({
  comment: yup
    .string()
    .min(2, "Comment should be of minimum 2 characters length")
    .required("Comment is required"),
});

export const searchValidation = yup.object({
  search: yup
    .string()
    .min(2, "Search string should be of minimum 2 characters length")
    .required("Search string is required"),
});

export const addTopicValidation = yup.object({
  topicName: yup
    .string()
    .min(2, "Topic name should be of minimum 2 characters length")
    .required("Topic name is required"),
  topicDescription: yup
    .string()
    .min(2, "Topic description should be of minimum 2 characters length")
    .required("Topic description is required"),
});
