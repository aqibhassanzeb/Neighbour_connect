import React, { useEffect, useState } from "react";
import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api";
import { useDispatch } from "react-redux";
import { setActiveUser, setToken } from "../../redux/reducers/auth";
import { toast } from "react-hot-toast";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    // alignContent:"center",
    // alignItems:"center",
    margin: "auto",
    marginTop: "18%",
    maxWidth: 600,
    maxHeight: 500,
    borderRadius: 20,
    backgroundColor: "#ffff",
    marginLeft: 45,
  },
  bar: {
    color: "red",
  },
  input: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#005D7A",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#005D7A",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#005D7A",
    },
  },
});

const Signin = () => {
  const history = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [login, response] = useLoginMutation();

  const [type, setType] = useState("");
  const [formValues, setFormValues] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: "You must enter a name",
    },
    email: {
      value: "",
      error: false,
      errorMessage: "You must enter an email",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "You must enter your password",
    },
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newFormValues = { ...formValues };
    if (!newFormValues.email.value) {
      newFormValues.email.error = true;
    } else {
      newFormValues.email.error = false;
    }
    if (!newFormValues.password.value) {
      newFormValues.password.error = true;
    } else {
      newFormValues.password.error = false;
    }
    if (!newFormValues.name.value && type === "signup") {
      newFormValues.name.error = true;
    } else {
      newFormValues.name.error = false;
    }
    setFormValues(newFormValues);
    if (!newFormValues.email.error && !newFormValues.password.error) {
      login({
        email: formValues.email.value,
        password: formValues.password.value,
      });
    }
  };

  useEffect(() => {
    if (response?.isSuccess && response?.data?.user?.status === "user") {
      toast.error("invalid email or password");
    } else if (
      response?.isSuccess &&
      response?.data?.user?.status === "admin"
    ) {
      dispatch(setActiveUser(response?.data?.user));
      dispatch(setToken(response?.data?.token));
      toast.success("Login Successful");
      history("/dashboard");
    }
  }, [response?.isSuccess]);

  useEffect(() => {
    if (response?.isError) {
      toast.error(response?.error?.data?.error);
    }
  }, [response?.isError]);

  return (
    <Box display="flex" flexDirection="row">
      <img src={require("../img/tp.PNG")} alt="User" width="500" height="500" />
      <Box>
        <Box className={classes.root}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ position: "relative", marginLeft: 2 }}>
              <div sx={{ marginLeft: 23 }}>
                <h1>Sign in</h1>
              </div>
            </Box>

            <Box
              display="flex"
              flexDirection={"column"}
              margin={"0px 30px 0px 30px"}
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  name="email"
                  fullWidth
                  className={classes.input}
                  onChange={handleInput}
                  error={type === "login" && formValues.email.error}
                  helperText={
                    type === "login" &&
                    formValues.email.error &&
                    formValues.email.errorMessage
                  }
                  value={formValues.email.value}
                  margin="normal"
                  type={"email"}
                  variant="outlined"
                  placeholder="Email"
                />
                <TextField
                  name="password"
                  fullWidth
                  className={classes.input}
                  onChange={handleInput}
                  error={type === "login" && formValues.password.error}
                  helperText={
                    type === "login" &&
                    formValues.password.error &&
                    formValues.password.errorMessage
                  }
                  value={formValues.password.value}
                  margin="normal"
                  type={"password"}
                  variant="outlined"
                  placeholder="Password"
                />
                <Button
                  onClick={(e) => history("/forgot-password")}
                  sx={{ marginLeft: 40 }}
                >
                  {" "}
                  Forgot Password
                </Button>
                <Button
                  className={classes.button}
                  onClick={(event) => setType("login")}
                  type="submit"
                  name="submit"
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    width: 150,
                    borderRadius: 3,
                    marginLeft: "35%",
                    marginBottom: 3,
                  }}
                  variant="contained"
                  style={{
                    backgroundColor: response.isLoading ? "white" : "#005D7A",
                    textTransform: "lowercase",
                  }}
                >
                  {response.isLoading ? (
                    <CircularProgress style={{ color: "#005D7A" }} size={25} />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;
