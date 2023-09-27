import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./card/Sidebar";
import ForgotPassword from "./component/Auth/ForgotPassowrd";
import Profile from "./component/Auth/Profile";
import Otpt from "./component/Auth/Otpt";
import Signin from "./component/Auth/Signin";
import Dashboard from "./component/Dashboard/Dashboard";
import Events from "./component/Event/Event";
import Groups from "./component/Group/Group";
import Playlist from "./component/Playlist/Playlist";
import Posts from "./component/Posts/Post";
import Stories from "./component/Story/Story";
import Users from "./component/User/User";
import OptionA from "./component/Option/OptionA";
import OptionB from "./component/OptionB/OptionB";
import OptionC from "./component/OptionC/OptionC";
import OptionD from "./component/OptionD/OptionD";
import OptionE from "./component/OptionE/OptionE";
import { Toaster } from "react-hot-toast";

const App = () => {
  const navigation = useLocation();
  const [set, setValue] = useState(true);
  // if(window.location.pathname === "/"){
  //   // history("/")
  //   setValue(false)
  // }
  const BoxStyle = styled(Box)({
    // display:"flex",
    // justifyContent:"center",
    // justifyItems:"center",
    // alignContent:"center",
    // alignItems:"center",
    width: "100%",
    height: "98%",
    alignContent: "center",
    justifyItems: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    margin: "0px 0px 0px 201px",
    position: "fixed",
    overflowY: "scroll",
    borderRadius: "0px 20px 20px 0px",
  });
  console.log("set", window.location.pathname);
  if (navigation.pathname != "/" && navigation.pathname != "/forgot-password") {
    return (
      <>
        <Toaster />
        <Sidebar />
        <BoxStyle>
          <Routes>
            <Route exact path="/Signin" element={<Signin />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/posts" element={<Posts />} />
            <Route exact path="/story" element={<Stories />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/playlist" element={<Playlist />} />
            <Route exact path="/groups" element={<Groups />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/OptionA" element={<OptionA />} />
            <Route exact path="/OptionB" element={<OptionB />} />
            <Route exact path="/OptionC" element={<OptionC />} />
            <Route exact path="/OptionD" element={<OptionD />} />
            <Route exact path="/OptionE" element={<OptionE />} />
          </Routes>
        </BoxStyle>
      </>
    );
  } else {
    return (
      <>
        <Toaster />
        <Routes>
          <Route exact path="/" element={<Signin />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/Otpt" element={<Otpt />} />
        </Routes>
      </>
    );
  }
};

export default App;
