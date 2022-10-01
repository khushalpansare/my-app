import React from "react";
import Grid from "@mui/material/Grid";
import { Link, Card, Stack, Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import Slide1 from "./Slide1.SVG";
import illustration_register from "./illustration_register.png";
import RegisterForm from "../Component/RegisterForm";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";

function RegisterPage() {
  // const histry = useHistory();

  const handlePagePush = () => {
    // histry.push("loginpage");
    console.log("handlePagePush");
  };

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
            <Box sx={{ mt: -4 }}>
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
              variant="h4"
              sx={{
                px: 5,
                // mt: 4,
                mb: 3,
                fontFamily: "Staatliches",
                fontWeight: "bold",
              }}
            >
              Hi, Welcome!
            </Typography>
            <Typography
              variant="h6"
              sx={{ px: 5, mt: 3, mb: 8, fontWeight: "bold" }}
            >
              Enter your personal details and start journey with us
            </Typography>
            <img src={illustration_register} alt="Register Image" />
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
                  mt: -1,
                },
                px: 3,
                mt: 12,
                align: "left",
                fontFamily: `font-family: 'Joan', serif;
                                 font-family: 'Lora', serif;
                                 font-family: 'Merriweather', serif;`,
              })}
            >
              Get started absolutely free.
            </Typography>
            <RegisterForm />
            <Typography
              align="center"
              sx={{
                mt: 2,
                fontSize: "0.9rem",
                color: "text.secondary",
              }}
            >
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to={"/loginpage"}
                underline="hover"
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  color: "#00AB55",
                }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default RegisterPage;
