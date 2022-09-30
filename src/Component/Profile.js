import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Confirmation from "../Common/Confirmation";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("*Required"),
  email: Yup.string().email().required("*Required"),
  phone: Yup.string()
    .min(10, "*Required")
    .max(10, "*Required")
    .matches(/^[0-9]+$/, "Phone Number Required")
    .required("*Required"),
});

function Profile(props) {
  const [image, setUploadImg] = useState(null);
  const [showConfermBox, setShowConfermBox] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    let id = localStorage.getItem("userId");
    await axios
      .get(`https://koto-user-api.herokuapp.com/user/avatar/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("daily-notes-token")}`,
        },
      })
      .then((res) => {
        setUploadImg(res.data.userImg[0].imagepath);
        // setLoading(false);
        localStorage.setItem("imageId", res.data.userImg[0]._id);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  const imageHandler = async (e) => {
    if (e.target.files[0].size <= 1000000) {
      const photo = new FormData();
      photo.append("photo", e.target.files[0], e.target.files[0].name);

      // if (image == null) {
      await axios
        .post(`https://koto-user-api.herokuapp.com/user/avatar`, photo, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem(
              "daily-notes-token"
            )}`,
          },
        })
        .then((res) => {
          getImage();
        })
        .catch((err) => {
          alert(err);
        });
      // } else {
      //   let imageId = localStorage.getItem("imageId");
      //   await axios
      //     .put(
      //       `https://koto-user-api.herokuapp.com/user/avatar/${imageId}`,
      //       photo,
      //       {
      //         headers: {
      //           "content-type": "multipart/form-data",
      //           Authorization: `Bearer ${localStorage.getItem(
      //             "daily-notes-token"
      //           )}`,
      //         },
      //       }
      //     )
      //     .then((res) => {
      //       getImage();
      //     })
      //     .catch((err) => {
      //       alert(err);
      //     });
      // }
    }
  };

  const handleConfermOpen = (element) => {
    setShowConfermBox(true);
  };

  const handleConfermClose = () => {
    setShowConfermBox(false);
  };

  const updateHandler = async (values) => {
    let id = localStorage.getItem("userId");
    await axios
      .put(`https://koto-user-api.herokuapp.com/user/${id}`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("daily-notes-token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.result);
        // console.log(Object.keys(res.data.data.result));
        localStorage.setItem("name", res.data.result.name);
        localStorage.setItem("email", res.data.result.email);
        localStorage.setItem("phone", res.data.result.phone);
        // getNote();
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  const deleteHandler = async () => {
    let id = localStorage.getItem("userId");
    await axios
      .delete(`https://koto-user-api.herokuapp.com/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("daily-notes-token")}`,
        },
      })
      .then((res) => {
        // getNote();
        handleConfermClose();
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return (
    <>
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Card
            sx={{
              // boxShadow: 6,
              width: "100%",
              maxWidth: 460,
              height: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Tooltip title="Change Photo">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden onChange={imageHandler} type="file" />
                  <DriveFolderUploadIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  // accept="image/*"
                  onChange={imageHandler}
                  type="file"
                />
                <Avatar
                  alt="Remy Sharp"
                  src={image}
                  sx={{ width: 100, height: 100 }}
                />
              </IconButton>
              <Tooltip title="Delete">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Card>
          <Card
            sx={{
              width: "100%",
              maxWidth: 670,
              height: 400,
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Formik
              initialValues={{
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                phone: localStorage.getItem("phone"),
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                updateHandler(values);
              }}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  getFieldProps,
                } = props;
                const handleClick = (e) => {
                  console.log(e);
                };
                return (
                  <form onSubmit={handleSubmit}>
                    <Grid container sx={{ p: 3 }} spacing={3}>
                      <Grid item md={12} sm={12} xs={12}>
                        <TextField
                          label="Name"
                          name="name"
                          value={values.name}
                          {...getFieldProps("name")}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                          color="success"
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <TextField
                          label="E-Mail"
                          name="email"
                          value={values.email}
                          {...getFieldProps("email")}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                          color="success"
                          fullWidth
                        />
                      </Grid>

                      <Grid item md={12} sm={12} xs={12}>
                        <TextField
                          label="Phone No."
                          name="phone"
                          value={values.phone}
                          {...getFieldProps("phone")}
                          error={Boolean(touched.phone && errors.phone)}
                          helperText={touched.phone && errors.phone}
                          color="success"
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <Button
                          size="small"
                          type="submit"
                          sx={{
                            background:
                              "linear-gradient(to right, #FF4B2B, #FF416C)",
                            float: "right",
                          }}
                          variant="contained"
                        >
                          Save changes
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                );
              }}
            </Formik>
          </Card>
        </Stack>
        <Box sx={{ mt: 5 }} align="right">
          <Button variant="outlined" color="error" onClick={handleConfermOpen}>
            <DeleteIcon /> Delete Account
          </Button>
        </Box>
        <Dialog open={showConfermBox} onClose={handleConfermClose}>
          <Confirmation
            dialog="Do you want to Delete your Account?"
            setShowConfermBox={setShowConfermBox}
            deleteHandler={deleteHandler}
          />
        </Dialog>
      </Container>
    </>
  );
}

export default Profile;
