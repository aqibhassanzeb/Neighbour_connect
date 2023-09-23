import { CircularProgress, makeStyles } from "@material-ui/core";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput, { ResendOTP } from "otp-input-react";
import { toast } from "react-hot-toast";
import {
  useResetPasswordMutation,
  useUserUpdateMutation,
  useVerifyOTPMutation,
} from "../../redux/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    // justifyContent:"center",
    // justifyItems:"center",
    // alignContent:"center",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto",
    marginTop: "10%",
    // height:400,
    maxWidth: 600,
    maxHeight: 500,
    borderRadius: 20,
    backgroundColor: "#ffff",
    color: "#005D7A",
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

const ForgotPassword = () => {
  const [sendCode, codeResponse] = useResetPasswordMutation();
  const [verifyOTP, verifyResp] = useVerifyOTPMutation();
  const [updateUser, updateResp] = useUserUpdateMutation();

  const classes = useStyles();
  const history = useNavigate();
  const [OTP, setOTP] = useState("");
  const [userId, setUserId] = useState("");
  const [isForgot, setForgot] = useState(false);
  const [type, setType] = useState("");
  const [formValues, setFormValues] = useState({
    confirmPassword: {
      value: "",
      error: false,
      errorMessage: "You must enter a confirm password",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.email.value) {
      return toast.error("Please enter an email address", {
        style: {
          textTransform: "capitalize",
        },
      });
    } else {
      sendCode({ email: formValues.email.value })
        .then((res) => {
          if (res.error) {
            toast.error(res.error.data.error, {
              style: {
                textTransform: "capitalize",
              },
            });
          } else if (res.data.message) {
            setUserId(res.data.user._id);
            setType("forgot");
            setForgot(!isForgot);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOTPSubmit = () => {
    if (!OTP && OTP.length < 4) {
      return toast.error("Please enter a vlid OTP");
    } else {
      verifyOTP({ resetCode: OTP, _id: userId })
        .then((res) => {
          if (res.error) {
            toast.error(res.error.data.error, {
              style: {
                textTransform: "capitalize",
              },
            });
          } else if (res.data.message) {
            setType("password");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSetPassword = (e) => {
    e.preventDefault();
    if (!formValues.password.value || !formValues.confirmPassword.value) {
      toast.error(`Please fill both fields`);
    } else if (formValues.password.value !== formValues.confirmPassword.value) {
      toast.error(`Passwords must be same`);
    } else if (
      formValues.password.value === formValues.confirmPassword.value &&
      formValues.password.value.length < 6
    ) {
      toast.error(`Weak Password`);
    } else {
      updateUser({ id: userId, data: { password: formValues.password.value } })
        .then((res) => {
          if (res.error) {
            toast.error(res.error.data.error, {
              style: {
                textTransform: "capitalize",
              },
            });
          } else if (res.data.message) {
            toast.success("Password Updated Successfuly");
            history("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

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

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h5" marginTop={10}>
          {!isForgot && "Forgot Password"}{" "}
          {isForgot && type === "password" && "Set Password"}
        </Typography>
        <Box sx={{ width: "100%" }}>
          {!isForgot && (
            <Box
              display="flex"
              flexDirection={"column"}
              margin={"50px 30px 0px 30px"}
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  name="email"
                  fullWidth
                  className={classes.input}
                  onChange={handleInput}
                  margin="normal"
                  type={"email"}
                  variant="outlined"
                  placeholder="Email"
                  value={formValues.email.value}
                />
                <Button
                  className={classes.button}
                  type="submit"
                  name="submit"
                  sx={{
                    marginTop: 7,
                    marginBottom: 7,
                    display: "flex",
                    width: 150,
                    borderRadius: 3,
                    marginLeft: "35%",
                  }}
                  variant="contained"
                  style={{
                    backgroundColor: codeResponse.isLoading
                      ? "white"
                      : "#005D7A",
                  }}
                >
                  {codeResponse.isLoading ? (
                    <CircularProgress style={{ color: "#005D7A" }} size={25} />
                  ) : (
                    "Send Otp"
                  )}
                </Button>
              </form>
            </Box>
          )}
          {isForgot && type !== "password" && (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
              margin={"20px 30px 0px 20px"}
            >
              <div
                style={{
                  padding: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 20,
                    textAlign: "center",
                  }}
                >
                  OTP Verification
                </div>
                <div
                  style={{
                    marginBottom: 25,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Enter OTP Code sent to {formValues.email.value}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <OTPInput
                    value={OTP}
                    inputClassName="bottom__border"
                    //  autoFocus
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                    inputStyles={{
                      border: 0,
                      width: 50,
                      border: "2px solid black",
                    }}
                    onChange={setOTP}
                  />
                </div>
              </div>

              <Button
                className={classes.button}
                onClick={handleOTPSubmit}
                type="submit"
                name="submit"
                sx={{
                  marginTop: 5,
                  marginBottom: 7,
                  display: "flex",
                  width: 150,
                  borderRadius: 3,
                }}
                variant="contained"
                style={{
                  backgroundColor: verifyResp.isLoading ? "white" : "#005D7A",
                }}
              >
                {verifyResp.isLoading ? (
                  <CircularProgress style={{ color: "#005D7A" }} size={25} />
                ) : (
                  " Verify Otp"
                )}
              </Button>
            </Box>
          )}
          {isForgot && type === "password" && (
            <Box
              display="flex"
              flexDirection={"column"}
              margin={"50px 30px 0px 30px"}
            >
              <form onSubmit={handleSetPassword}>
                <TextField
                  name="password"
                  fullWidth
                  className={classes.input}
                  onChange={handleInput}
                  value={formValues.password.value}
                  margin="normal"
                  type={"password"}
                  variant="outlined"
                  placeholder="Password"
                />

                <TextField
                  name="confirmPassword"
                  fullWidth
                  className={classes.input}
                  onChange={handleInput}
                  value={formValues.confirmPassword.value}
                  margin="normal"
                  type={"password"}
                  variant="outlined"
                  placeholder="Confirm Password"
                />
                <Button
                  className={classes.button}
                  type="submit"
                  name="submit"
                  sx={{
                    marginTop: 7,
                    marginBottom: 7,
                    display: "flex",
                    width: 150,
                    borderRadius: 3,
                    marginLeft: "35%",
                  }}
                  variant="contained"
                  style={{
                    backgroundColor: updateResp.isLoading ? "white" : "#005D7A",
                  }}
                >
                  {updateResp.isLoading ? (
                    <CircularProgress style={{ color: "#005D7A" }} size={25} />
                  ) : (
                    " Done"
                  )}
                </Button>
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
