import React from "react";
import { Button, TextField } from "@mui/material";
import { DialogActions, DialogContent } from "@mui/material/";

function TodolistForm(props) {
  return (
    <>
      <DialogContent>
        <TextField
          label="Title"
          onChange={(e) =>
            props.setNote({ ...props.note, title: e.target.value })
          }
          fullWidth
        />
        <TextField
          label="Description"
          color="success"
          sx={{ mt: 2 }}
          onChange={(e) =>
            props.setNote({ ...props.note, description: e.target.value })
          }
          fullWidth
        />
        <DialogActions>
          <Button
            size="large"
            type="submit"
            sx={{
              background: "linear-gradient(to right, #FF4B2B, #FF416C)",
            }}
            variant="contained"
            onClick={props.submitHandler}
            fullWidth
          >
            Login
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
}

export default TodolistForm;
