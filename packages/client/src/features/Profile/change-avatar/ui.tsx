import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";

import {
  useChangeAvatarMutation,
  useGetUserQuery,
} from "@/entities/user/model/api";
import { avatarConverter } from "@/entities/user/model/converters";
import { initialAvatarForm } from "@/shared/constants/formInitials";
import { configureResourcePath } from "@/shared/utils/configureUrl";

import { ChangeAvatarSchema } from "../schemas/change-avatar";

export const ChangeAvatarForm = () => {
  const [changeAvatar] = useChangeAvatarMutation();
  const { data } = useGetUserQuery();
  const currAvatar = configureResourcePath(data?.avatar);
  const [currentAvatar, setCurrentAvatar] = useState<string>(currAvatar);

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues: initialAvatarForm,
    validationSchema: ChangeAvatarSchema,
    onSubmit: () => {
      const data = avatarConverter(values);
      changeAvatar(data);
    },
  });

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const newFile = event.currentTarget.files[0];
      setFieldValue("avatar", newFile);
      setCurrentAvatar(URL.createObjectURL(newFile));
    }
  };

  const props = {
    className: "change-avatar",
    title: "Avatar",
    avatar: values.avatar,
    handleSubmit: handleSubmit,
    btn: "save",
  };
  return (
    <Box
      className="change-avatar"
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        maxWidth: "595px",
        width: "100%",
        margin: "auto",
        border: "1px solid",
        background:
          "linear-gradient(152.97deg, rgba(0, 0, 0, 0.4655) 15.24%, rgba(0, 0, 0, 0.95) 115.24%) ",
      }}>
      <Card
        sx={{
          my: "2rem",
          background: "transparent",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}>
        <CardHeader
          titleTypographyProps={{ variant: "h3" }}
          title={props.title}
          sx={{
            padding: "0",
            textAlign: "center",
          }}
        />
        <CardContent
          sx={{
            padding: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "80%",
            height: "100%",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: "1rem",
            }}>
            <Avatar
              alt={data?.login}
              sx={{ width: 202, height: 188 }}
              src={currentAvatar}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "152px",
              maxWidht: "452px",
              width: "100%",
              border: `${
                errors.avatar ? "1px dashed #f44336" : "1px dashed #E0E0E0"
              }`,
              borderRadius: "4px",
            }}>
            <UploadFileIcon />
            <Box>
              <Typography>
                <Link component="label">
                  Click to upload{" "}
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleUploadFile}
                    accept="image/png, image/jpeg, image/jpg, image/svg, image/gif"
                    hidden
                  />
                </Link>{" "}
                or drag and drop
              </Typography>
            </Box>
            <Box>
              <Typography>SVG, PNG, JPG or GIF</Typography>
            </Box>
          </Box>
          {errors.avatar && (
            <Typography align="center" py={1} color="error">
              {errors.avatar}
            </Typography>
          )}
          <CardActions
            sx={{
              mt: "1.5rem",
              padding: "0",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <Button type="submit" fullWidth variant="contained">
              {props.btn}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};
