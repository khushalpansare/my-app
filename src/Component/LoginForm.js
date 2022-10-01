import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("*Required"),
  password: Yup.string()
    .min(8, "Must have at least 8 character")
    .max(12, "password to Long")
    .matches(/^[0-9]+$/, "Password should contain only numbers")
    .required("*Required"),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  let navigate = useNavigate();

  const submitHandler = (values) => {
    setLoading(true);
    axios
      .post(`https://koto-user-api.herokuapp.com/user/login`, values)
      .then((res) => {
        localStorage.setItem("daily-notes-token", res.data.token);
        localStorage.setItem("userId", res.data._id);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("phone", res.data.phone);
        // localStorage.setItem("username", res.data.username);
        // console.log(res);
        setLoading(false);
        navigate("/todolist", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.msg);
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
            username: "",
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
                        label="username"
                        name="username"
                        value={values.username}
                        {...getFieldProps("username")}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                        color="success"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <TextField
                        label="PassWord"
                        color="success"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
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
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} my={-1}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              sx={{
                                color: "#f4511e",
                                "&.Mui-checked": {
                                  color: "#f4511e",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                fontFamily: "Anek Malayalam",
                                fontSize: "1rem",
                              }}
                            >
                              Remember me
                            </Typography>
                          }
                        />
                        <Link
                          underline="hover"
                          sx={{
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            color: "#00AB55",
                          }}
                        >
                          Forgot password?
                        </Link>
                      </Stack>
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
                        Login
                      </LoadingButton>
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

export default LoginForm;
