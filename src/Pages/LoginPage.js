import React from "react";
import Grid from "@mui/material/Grid";
import { Card, Link, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Slide1 from "./Slide1.SVG";
import illustration_login from "./illustration_login.png";
import { Box } from "@mui/system";
import LoginForm from "../Component/LoginForm";
import { Link as RouterLink } from "react-router-dom";

function LoginPage2() {
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          sm={6}
          md={6}
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
          }}
        >
          <Card
            sx={{
              m: 2,
              width: "100%",
              maxWidth: 464,
              height: 720,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "linear-gradient(to right, #FF4B2B, #FF416C)",
              color: "#FFFFFF",
            }}
          >
            <Box
              sx={{
                mt: -9,
              }}
            >
              <img
                src={Slide1}
                alt="My SVG Logo"
                width={180}
                height={100}
                sx={{
                  px: 5,
                  mt: 20,
                }}
              />
            </Box>
            <Typography
              variant="h3"
              sx={{
                px: 5,
                mt: 3,
                mb: 3,
                fontFamily: [
                  "Fascinate",
                  "Joan",
                  "Libre Baskerville",
                  "Lora",
                  "Merriweather",
                ],
              }}
            >
              Hi, Welcome Back!
            </Typography>
            <Box sx={{ mt: 10 }}>
              <img
                width={380}
                height={300}
                src={illustration_login}
                sx={{ mt: 5 }}
                alt="Register Image"
              />
            </Box>
          </Card>
        </Grid>
        <Grid item sm={12} md={6} xs={12}>
          <Box
            sx={{
              display: { xs: "block", sm: "block", md: "none" },
            }}
          >
            <img src={Slide1} alt="My SVG Logo" width={180} height={100} />
          </Box>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography
              variant="h5"
              sx={(theme) => ({
                [theme.breakpoints.down("md")]: {
                  mt: 2,
                },
                px: 3,
                mt: 20,
                align: "left",
                fontWeight: "bold",
                fontSize: "1rem",
                color: "text.secondary",
              })}
            >
              Use you Username and passWord for logIn
            </Typography>

            <LoginForm />
            <Typography
              align="center"
              sx={{
                mt: 2,
                fontFamily: ["Merriweather"],
                fontSize: "0.8rem",
              }}
            >
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to={"/"}
                underline="hover"
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "#00AB55",
                }}
              >
                Get started
              </Link>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginPage2;
