import { FC, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { addTopicValidation } from "@/shared/constants/validationShemas";

export const AddTopic: FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formikAddTopic = useFormik({
    initialValues: {
      topicName: "",
      topicDescription: ""
    },
    validationSchema: addTopicValidation,
    onSubmit: values => {
      console.log(values);
    },
    onReset: () => {
      handleClose();
    }
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Paper variant="outlined"
               sx={{
                 position: "absolute",
                 top: "50%",
                 left: "50%",
                 transform: "translate(-50%, -50%)",
                 width: "400px",
                 padding: "16px"
               }}>
          <Typography id="modal-title" variant="h6" component="h3" align="center">
            Add Topic
          </Typography>

          <Box
            component="form"
            onSubmit={formikAddTopic.handleSubmit}
            onReset={formikAddTopic.handleReset}
            sx={{
              width: "100%",
              my: 2,
              mr: 5
            }}>
            <TextField
              fullWidth
              id="topicName"
              name="topicName"
              label="Name"
              onChange={formikAddTopic.handleChange}
              error={formikAddTopic.touched.topicName && Boolean(formikAddTopic.errors.topicName)}
              helperText={formikAddTopic.touched.topicName && formikAddTopic.errors.topicName}
              sx={{
                mb: 2
              }}
            />
            <TextField
              fullWidth
              id="topicDescription"
              name="topicDescription"
              label="Description"
              onChange={formikAddTopic.handleChange}
              error={formikAddTopic.touched.topicDescription && Boolean(formikAddTopic.errors.topicDescription)}
              helperText={formikAddTopic.touched.topicDescription && formikAddTopic.errors.topicDescription}
              sx={{
                mb: 2
              }}
            />
            <Box component="div" sx={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <Button variant="text" type="reset">Cancel</Button>
              <Button variant="text" type="submit">Add</Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
      <Button variant="contained" size="large" type="button" onClick={handleOpen}>
        Add +
      </Button>
    </>
  );
};
