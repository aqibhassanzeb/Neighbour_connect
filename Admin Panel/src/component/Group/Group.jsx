import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Custom/Alert";
import { useUserUpdateMutation } from "../../redux/api";
import { setActiveUser } from "../../redux/reducers/auth";

const EditDetailsPage = () => {
  const activeUser = useSelector((state) => state.authReducer.activeUser);

  const nameParts = activeUser.name.split(" ");
  const [firstName, setFirstName] = useState(nameParts[0]);
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" "));
  const [email, setEmail] = useState(activeUser.email);
  const [password, setPassword] = useState("");

  const [updateUser, updateResp] = useUserUpdateMutation();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const dispatch = useDispatch();
  const handleSave = () => {
    updateUser({
      id: activeUser._id,
      data: { name: `${firstName} ${lastName}`, email },
    })
      .then((res) => {
        if (res.error) {
          setShowSnackbar({
            toggle: true,
            message: res.error.data.error,
          });
        } else if (res.data.message) {
          dispatch(
            setActiveUser({
              ...activeUser,
              name: `${firstName} ${lastName}`,
              email,
            })
          );
          setShowSnackbar({
            toggle: true,
            message: "Saved Successfully !",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [openSnack, setShowSnackbar] = useState({ toggle: false, message: "" });

  const handleClose = () => {
    setShowSnackbar({ toggle: false, message: "" });
  };

  return (
    <>
      <Box
        sx={{
          margin: "0px 0px 10px 0px",
          width: "100%",
          height: 80,
          backgroundColor: "#005D7A",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h"
          marginLeft={1}
          color="#fff"
          backgroundColor="#005D7A"
          fontWeight="bold"
          marginRight={66}
          marginTop={1}
        >
          Account Settings
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 1,
            backgroundColor: "#fff",
            borderRadius: "4px",
            height: 23,
          }}
        ></Box>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: "3rem",
          margin: 0,
        }}
      >
        <div style={{ marginRight: "3rem" }}>
          <div
            style={{
              padding: "2rem",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              paddingLeft: "4rem",
              paddingRight: "4rem",
            }}
          >
            <Grid container direction="column" alignItems="center" spacing={3}>
              <Grid item>
                <Avatar
                  alt="Admin Avatar"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : activeUser.image
                  }
                  style={{
                    width: "10rem",
                    height: "10rem",
                    marginBottom: "2rem",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h5" align="center">
                  {`${firstName} ${lastName}`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" align="center">
                  Admin
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ backgroundColor: "#005D7A", color: "white" }}
                >
                  Change Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  {selectedFile
                    ? `Selected File: ${selectedFile.name}`
                    : "No file chosen"}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
        <div
          style={{
            maxWidth: "500px",
            padding: "2rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            height: "fit-content",
          }}
        >
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={handleFirstNameChange}
            style={{ marginBottom: "1.5rem" }}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={handleLastNameChange}
            style={{ marginBottom: "1.5rem" }}
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            style={{ marginBottom: "1.5rem" }}
          />
          <Typography variant="body1" align="left" paddingBottom={2}>
            Change Password
          </Typography>
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ marginBottom: "1.5rem" }}
          />
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ marginBottom: "2rem" }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
        <Alert
          openSnack={openSnack.toggle}
          message={openSnack.message}
          severity="success"
          handleClose={handleClose}
        />
      </div>
    </>
  );
};

export default EditDetailsPage;
