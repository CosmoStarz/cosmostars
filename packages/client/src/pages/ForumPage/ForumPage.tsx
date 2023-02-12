import { FC } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  CardActionArea, CardHeader,
  IconButton, InputAdornment,
  List,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { TopicItem } from "../../features/TopicItem/TopicItem";
import { searchValidation } from "../../shared/constants/validationShemas";
import { topicMock } from "../../shared/constants/mocks";
import { MainLayout } from "../../shared/layouts/MainLayout";
import { ArrowForward, Search } from "@mui/icons-material";
import { AddTopic } from "../../features/AddTopic/AddTopic";

export const ForumPage: FC = () => {
  const formikSearch = useFormik({
    initialValues: {
      search: ""
    },
    validationSchema: searchValidation,
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <MainLayout>
      <Paper
        variant="outlined"
        sx={{
          backgroundColor: "rgb(0 0 0 / 80%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          width: "80%",
          margin: "auto",
          padding: 3
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%"
          }}>
          <Typography
            variant="h2"
            component="h1"
            className="topic-page__name"
            m={"auto"}>
            Forum
          </Typography>
        </Box>

        <Box
          sx={{
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            px: 4
          }}>
          <Box
            component="form"
            onSubmit={formikSearch.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              width: "80%",
              my: 2,
              mr: 5
            }}>
            <TextField
              fullWidth
              id="search"
              name="search"
              label="Search"
              onChange={formikSearch.handleChange}
              error={formikSearch.touched.search && Boolean(formikSearch.errors.search)}
              helperText={formikSearch.touched.search && formikSearch.errors.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search topic"
                      edge="end"
                      type="submit"
                    >
                      <ArrowForward></ArrowForward>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                mb: 2
              }}
            />
          </Box>
          <AddTopic/>
        </Box>

        <List
          sx={{
            width: "100%",
            overflowY: "scroll"
          }}>
          {topicMock.map(item => (
            <TopicItem key={item.id} bordered {...item} header={() => (
              <CardActionArea component={Link} to={`/forum/${item.id}`}>
                <CardHeader
                  title={<Typography variant="h5" component="h2">Topic {item.id}</Typography>}
                />
              </CardActionArea>
            )} />
          ))}
        </List>
      </Paper>
    </MainLayout>
  );
};
