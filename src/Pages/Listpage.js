import React from "react";
import axios from "axios";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  ClickAwayListener,
  Collapse,
  Container,
  Dialog,
  DialogContent,
  Fade,
  Grid,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import Confirmation from "../Common/Confirmation";
import TodolistForm from "../Component/TodolistForm";
import ListformUpdate from "../Component/ListformUpdate";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

function Listpage() {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [noteData, setNoteData] = useState([]);
  const [noteId, setNoteId] = useState();
  const [multiplenoteId, setMultipleNoteId] = useState([]);
  const [addBoxOpen, setAddBoxOpen] = useState(false);
  const [updateBoxOPen, setUpdateBoxOpen] = useState(false);
  const [showConfermBox, setShowConfermBox] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNote();
  }, []);

  const handleClose = () => {
    setAddBoxOpen(false);
    setUpdateBoxOpen(false);
    setNote({
      title: "",
      description: "",
    });
  };

  const handleConfermOpen = (element) => {
    setShowConfermBox(true);
    setNoteId(element._id);
  };

  const handleConfermClose = () => {
    setShowConfermBox(false);
  };

  const handleShowAddBox = () => {
    setAddBoxOpen(true);
    setNote({
      title: "",
      description: "",
    });
  };

  const handleUpdateBox = (element) => {
    setUpdateBoxOpen(true);
    setNoteId(element._id);
    setNote({
      title: element.title,
      description: element.description,
    });
  };

  const getNote = async () => {
    setLoading(true);
    await axios
      .get(`https://koto-user-api.herokuapp.com/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("daily-notes-token")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setNoteData(res.data.result);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.msg);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`https://koto-user-api.herokuapp.com/product`, note, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("daily-notes-token")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        getNote();
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.msg);
      });
    setNote({
      title: "",
      description: "",
    });
  };

  const handleEditNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(`https://koto-user-api.herokuapp.com/product/${noteId}`, note, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("daily-notes-token")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        getNote();
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.msg);
      });
    setNote({
      title: "",
      description: "",
    });
  };

  const deleteHandler = async (element) => {
    setLoading(true);
    await axios
      .delete(`https://koto-user-api.herokuapp.com/product/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("daily-notes-token")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        getNote();
        handleConfermClose();
      })
      .catch((err) => {
        setLoading(false);
        alert(err.response.data.msg);
      });
  };

  return (
    <>
      <Container>
        <Grid container spacing={2} align="center">
          {noteData.map((element, index) => {
            return (
              <Grid sm={6} md={4} xs={12} sx={{ mt: 2 }} key={index}>
                <Card sx={{ maxWidth: 250, height: 270 }}>
                  <CardContent
                    sx={{
                      background: "linear-gradient(to right, #FF4B2B, #FF416C)",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="h6" color="text.secondary">
                        {element.title}
                      </Typography>
                      {/* <Checkbox
                        sx={{
                          color: "#FFFF",
                          "&.Mui-checked": {
                            color: "#FFFF",
                          },
                        }}
                        onClick={(e) => selectNotes(e, element)}
                      /> */}
                    </Stack>
                  </CardContent>
                  <CardContent sx={{ height: "100px", overflow: "auto" }}>
                    <Typography
                      sx={{
                        fontSize: 18,
                        mt: 2,
                        display: "flex",
                        wordBreak: "break-word",
                      }}
                    >
                      {element.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      sx={{ color: "Green" }}
                      onClick={() => handleUpdateBox(element)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleConfermOpen(element)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              justifyContent: "center",
              alignItems: "flex-end",
            },
            mt: 2,
          })}
        >
          <IconButton onClick={handleShowAddBox} sx={{ color: "#FF4B2B" }}>
            <AddCircleSharpIcon fontSize="large" />
          </IconButton>
        </Stack>
        {/* ListForm Dialog Box */}
        <Dialog open={addBoxOpen} onClose={handleClose}>
          <TodolistForm
            submitHandler={submitHandler}
            setNote={setNote}
            note={note}
          />
        </Dialog>
        {/* Update ListForm Dialog Box */}
        <Dialog open={updateBoxOPen} onClose={handleClose}>
          <ListformUpdate
            handleEditNote={handleEditNote}
            setNote={setNote}
            note={note}
          />
        </Dialog>
        {/* Confirmation Dialog Box */}
        <Dialog open={showConfermBox} onClose={handleConfermClose}>
          <Confirmation
            dialog="Do you want to Delete ?"
            setShowConfermBox={setShowConfermBox}
            deleteHandler={deleteHandler}
            // multipleDelete={multipleDelete}
            multiplenoteId={multiplenoteId}
          />
        </Dialog>

        {/* Loader Dailog */}
        <Dialog
          open={loading}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Fade in={loading} unmountOnExit>
              <CircularProgress />
            </Fade>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default Listpage;
