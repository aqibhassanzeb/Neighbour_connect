import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React from "react";

const Alert = ({ openSnack, handleClose, severity, message }) => {
  const state = {
    vertical: "top",
    horizontal: "center",
  };
  const { vertical, horizontal } = state;
  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      severity={severity}
    >
      <MuiAlert
        severity={severity}
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
