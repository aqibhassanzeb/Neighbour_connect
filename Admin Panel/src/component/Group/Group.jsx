import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Box, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Custom/Alert";
import {
  uploadImage,
  usePictureUploadMutation,
  useUserUpdateMutation,
} from "../../redux/api";
import { setActiveUser } from "../../redux/reducers/auth";
import { toast } from "react-hot-toast";

const EditDetailsPage = () => {
  const activeUser = useSelector((state) => state.authReducer.activeUser);
  const [uploadPicture, pictureResp] = usePictureUploadMutation();

  const nameParts = activeUser.name.split(" ");
  const [firstName, setFirstName] = useState(nameParts[0]);
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" "));
  const [email, setEmail] = useState(activeUser.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(0);

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

  const dispatch = useDispatch();
  const handleSave = () => {
    setIsLoading(2);

    updateUser({
      id: activeUser._id,
      data: { name: `${firstName} ${lastName}`, email },
    })
      .then((res) => {
        if (res.error) {
          toast.error(res.error.data.error, {
            style: {
              textTransform: "capitalize",
            },
          });
        } else if (res.data.message) {
          dispatch(
            setActiveUser({
              ...activeUser,
              name: `${firstName} ${lastName}`,
              email,
            })
          );
          toast.success("Saved Successfuly");
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePassword = () => {
    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else if (password.length < 6) {
      toast.error("Weak password");
    } else {
      setIsLoading(1);
      updateUser({ id: activeUser._id, data: { password } })
        .then((res) => {
          if (res.error) {
            toast.error(res.error.data.error, {
              style: {
                textTransform: "capitalize",
              },
            });
          } else if (res.data.message) {
            toast.success("Password Updated Successfuly");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsLoading(3);
    const imageURL = await uploadImage(file);
    updateUser({
      id: activeUser._id,
      data: { image: imageURL },
    })
      .then((res) => {
        if (res.error) {
          toast.error(res.error.data.error, {
            style: {
              textTransform: "capitalize",
            },
          });
        } else if (res.data.message) {
          dispatch(
            setActiveUser({
              ...activeUser,
              image: imageURL,
            })
          );
          toast.success("Picture Updated");
        }
      })
      .catch((err) => console.log(err));
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
          padding: "1rem",
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
              marginTop: "3rem",
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
                  sx={{
                    backgroundColor:
                      updateResp.isLoading && isLoading === 3
                        ? "white"
                        : "#005D7A",
                  }}
                >
                  {updateResp.isLoading && isLoading === 2 ? (
                    <CircularProgress style={{ color: "#005D7A" }} size={25} />
                  ) : (
                    "Change Profile Picture"
                  )}

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
                  {selectedFile ? `Selected File: ${selectedFile.name}` : ""}
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
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor:
                updateResp.isLoading && isLoading === 2 ? "white" : "#005D7A",
            }}
            onClick={handleSave}
            style={{ marginTop: "1rem", marginBottom: "1.5rem" }}
          >
            {updateResp.isLoading && isLoading === 2 ? (
              <CircularProgress style={{ color: "#005D7A" }} size={25} />
            ) : (
              "Update Profile"
            )}
          </Button>
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "1.5rem" }}
          />
          <TextField
            label="Confirm Password"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginBottom: "1.1em" }}
          />
          <Button
            variant="contained"
            component="label"
            style={{
              backgroundColor:
                updateResp.isLoading && isLoading === 1 ? "white" : "#005D7A",
            }}
            onClick={handlePassword}
          >
            {updateResp.isLoading && isLoading === 1 ? (
              <CircularProgress style={{ color: "#005D7A" }} size={25} />
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditDetailsPage;
