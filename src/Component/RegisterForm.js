import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("*Required"),
  email: Yup.string().email().required("*Required"),
  userName: Yup.string().required("*Required"),
  phone: Yup.string()
    .min(10, "*Required")
    .max(10, "*Required")
    .matches(/^[0-9]+$/, "Phone Number Required")
    .required("*Required"),
  password: Yup.string()
    .min(8, "Must have at least 8 character")
    .max(12, "password to Long")
    .matches(/^[0-9]+$/, "Password should contain only numbers")
    .required("*Required"),
});

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const submitHandler = (values) => {
    setLoading(true);
    axios
      .post(`https://koto-user-api.herokuapp.com/user/signup`, values)
      .then((res) => {
        // console.log(res);
        // history.push("LoginForm");
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            userName: "",
            phone: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            submitHandler(values);
            console.log(values);
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
              <Container sx={{ maxWidth: "100%" }}>
                <form onSubmit={handleSubmit}>
                  <Grid container sx={{ mt: 3 }} spacing={3}>
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

                    <Grid item md={6} sm={6} xs={12}>
                      <TextField
                        label="Choose Username"
                        name="userName"
                        value={values.userName}
                        {...getFieldProps("userName")}
                        error={Boolean(touched.userName && errors.userName)}
                        helperText={touched.userName && errors.userName}
                        color="success"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
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
                      <TextField
                        label="PassWord"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                onClick={handleShowPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        value={values.password}
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        color="success"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <LoadingButton
                        size="large"
                        type="submit"
                        sx={{
                          background:
                            "linear-gradient(to right, #FF4B2B, #FF416C)",
                        }}
                        variant="contained"
                        fullWidth
                        loading={loading}
                      >
                        Sign up
                      </LoadingButton>
                      {/* <LoadingButton variant="outlined" loading={loading}>
                        Submit
                      </LoadingButton> */}
                    </Grid>
                  </Grid>
                </form>
              </Container>
            );
          }}
        </Formik>
      </Box>
    </>
  );
}

export default RegisterForm;
