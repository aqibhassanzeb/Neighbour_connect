import { makeStyles } from "@material-ui/core";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import { RecentMessage } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "98%",
    height: "97%",
    backgroundColor: "#ffff",
    margin: "10px 10px 10px 5px",
    borderRadius: 20,
    // display:"colum",
    // justifyContent:"center"
  },
  root1: {
    padding: "10px 0px 0px 20px",
    display: "flex",
    // justifyContent:"center",
    // justifyItems:"center",
    // alignContent:"center",
    // alignItems:"center",
    flexDirection: "row",
    position: "relative",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    // justifyContent:"center",
    // justifyItems:"center",
    // alignContent:"center",
    // alignItems:"center",
    marginTop: "60px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    // justifyContent:"center",
    // justifyItems:"center",
    // alignContent:"center",
    // alignItems:"center",
    color: "black",
    margin: "50px 0px 0px 300px",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "red",
  },
});
const Profile = () => {
  const { name, image, email } = useSelector(
    (state) => state.authReducer.activeUser
  );

  const navigate = useNavigate();
  const classes = useStyles();

  const history = useNavigate();
  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.root1}>
          <Box className={classes.image}>
            <Avatar
              alt="Avatar"
              style={{ width: 250, height: 250 }}
              src={image}
            />
          </Box>
          <Box className={classes.details}>
            <Typography variant="h6" fontWeight={"bold"} marginTop={10}>
              {name}
            </Typography>
            <Typography fontSize={12}>{email}</Typography>

            <Button
              onClick={(e) => history("/groups")}
              variant="contained"
              sx={{
                marginTop: 2,
                bgcolor: "#005D7A",
                ":hover": { bgcolor: "#005D7A" },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
        <Divider variant="middle" sx={{ bgcolor: "divider", marginTop: 42 }} />
      </Box>
    </>
  );
};

export default Profile;
