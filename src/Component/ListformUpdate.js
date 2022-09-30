import React from "react";
import { Button, TextField } from "@mui/material";
import { DialogActions, DialogContent } from "@mui/material/";

function ListformUpdate(props) {
  return (
    <>
      <DialogContent>
        <TextField
          value={props.note.title}
          onChange={(e) =>
            props.setNote({ ...props.note, title: e.target.value })
          }
          fullWidth
        />
        <TextField
          sx={{ mt: 2 }}
          value={props.note.description}
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
            onClick={props.handleEditNote}
            fullWidth
          >
            Login
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
}

export default ListformUpdate;
