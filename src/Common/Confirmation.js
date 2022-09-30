import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import React from "react";

function Confirmation(props) {
  // console.log(
  //   props.multiplenoteId.length ? props.multipleDelete : props.deleteHandler
  // );

  return (
    <>
      <DialogContent>
        <DialogContentText>{props.dialog}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="small" color="success" onClick={props.deleteHandler}>
          Yes
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => props.setShowConfermBox(false)}
        >
          No
        </Button>
      </DialogActions>
    </>
  );
}

export default Confirmation;
