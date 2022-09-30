import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Slide1 from "../Pages/Slide1.SVG";
import Profile from "./Profile";
import { Menu, MenuItem } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function NavigationBar() {
  const [open, setOpen] = useState(null);

  const handleOpenUserMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpen(null);
  };

  return (
    <>
      {/* <AppBar position="static" color="default"> */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, mt: 1, mx: -3 }}>
            <Avatar
              alt="Remy Sharp"
              src={Slide1}
              sx={{ width: 170, height: 70 }}
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account Settings" arrow={true} aria-haspopup="true">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </Tooltip>
            {/* <Profile handleCloseUserMenu={handleCloseUserMenu} open={open} /> */}
            <Menu
              sx={{ mt: "45px" }}
              // id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 18,
                    width: 13,
                    height: 15,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              open={open}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={RouterLink}
                to={"/todolist"}
                onClick={handleCloseUserMenu}
              >
                Home
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to={"/setting"}
                onClick={handleCloseUserMenu}
              >
                Settings
              </MenuItem>
              <MenuItem sx={{ color: "red" }}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {/* </AppBar> */}
    </>
  );
}

export default NavigationBar;
