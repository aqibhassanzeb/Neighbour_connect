import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Stack } from "@mui/system";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import PlaylistAddCheckCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCheckCircleTwoTone";
import Diversity3TwoToneIcon from "@mui/icons-material/Diversity3TwoTone";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HistoryIcon from "@mui/icons-material/History";

import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
const BoxStyle = styled(Box)({
  // display:"flex",
  width: 200,
  height: "98%",
  alignContent: "center",
  justifyItems: "center",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#005D7A",
  color: "#ffff",
  position: "fixed",
  borderRadius: "20px 0px 0px 20px",
  borderColor: "#fff",
});
let onClick = {
  marginLeft: 20,
  backgroundColor: "#005D7A",
  color: "#ffff",
  borderRadius: 10,
  marginRight: 10,
};
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const navigation = useLocation();

  const handleClick = () => {
    setOpen(!open);
  };
  const CheckPath = (path) => {
    if (navigation.pathname === path) return true;
  };
  const ListItem = styled(ListItemButton)({
    marginLeft: 20,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "#DCEFF5",
      color: "#005D7A",
      borderRadius: 10,
      marginRight: 10,
      "& .MuiListItemIcon-root": {
        color: "#ffff",
      },
    },
  });
  const ItemIcon = styled(ListItemIcon)({
    color: "#005D7A",
  });

  return (
    <>
      <BoxStyle>
        <Divider
          variant="fullWidth"
          sx={{ bgcolor: "#005D7A", marginTop: 1.8 }}
        />
        <Stack
          onClick={() => history("/dashboard")}
          direction={"row"}
          gap={1}
          sx={{ marginTop: 2, marginLeft: 1, "&:hover": { cursor: "pointer" } }}
        >
          <Diversity2TwoToneIcon
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              cursor: "pointer",
              color: "#fff",
              bottom: 7,
            }}
          />

          <Typography
            variant="h"
            fontWeight={"bold"}
            sx={{
              position: "absolute",
              margin: "5px 0px 32px 45px",
              color: "#fff",
              height: "80",
              backgroundColor: "#005D7A",
            }}
            color={"#fff"}
          >
            Neighbor Connect
          </Typography>
        </Stack>
        <Divider
          variant="fullWidth"
          sx={{ bgcolor: "#DCEFF5", marginTop: 1 }}
        />
        <List
          sx={{
            width: "100%",
            maxWidth: 760,
            color: "#005D7A",
            bgcolor: "#f2f2f2",
            paddingBottom: 120,
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItem
            onClick={(event) => history("/dashboard")}
            style={CheckPath("/dashboard") ? { ...onClick } : {}}
          >
            <ItemIcon
              style={CheckPath("/dashboard") ? { color: "#DCEFF5" } : {}}
            >
              <GridViewOutlinedIcon />
            </ItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            onClick={(event) => history("/users")}
            style={CheckPath("/users") ? { ...onClick } : {}}
          >
            <ItemIcon style={CheckPath("/users") ? { color: "#ffff" } : {}}>
              <PersonOutlineOutlinedIcon />
            </ItemIcon>
            <ListItemText primary="Residents" />
          </ListItem>

          <ListItem
            onClick={(event) => history("/posts")}
            style={CheckPath("/posts") ? { ...onClick } : {}}
          >
            <ItemIcon style={CheckPath("/posts") ? { color: "#ffff" } : {}}>
              <PostAddRoundedIcon />
            </ItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>

          <ListItem
            onClick={(event) => history("/story")}
            style={CheckPath("/story") ? { ...onClick } : {}}
          >
            <ItemIcon style={CheckPath("/story") ? { color: "#ffff" } : {}}>
              <PersonRemoveOutlinedIcon />
            </ItemIcon>
            <ListItemText primary="Spam Accounts" />
          </ListItem>

          <ListItem
            onClick={(event) => history("/events")}
            style={CheckPath("/events") ? { ...onClick } : {}}
          >
            <ItemIcon style={CheckPath("/events") ? { color: "#ffff" } : {}}>
              <ContentPasteOffOutlinedIcon />
            </ItemIcon>
            <ListItemText primary="Spam Content" />
          </ListItem>

          <ListItem
            onClick={(event) => history("/playlist")}
            style={CheckPath("/playlist") ? { ...onClick } : {}}
          >
            <ItemIcon style={CheckPath("/playlist") ? { color: "#ffff" } : {}}>
              <HistoryIcon />
            </ItemIcon>
            <ListItemText primary="Action History" />
          </ListItem>
          <ListItem
            onClick={(event) => history("/groups")}
            style={CheckPath("/groups") ? { ...onClick } : {}}
          >
            <ItemIcon style={CheckPath("/groups") ? { color: "#ffff" } : {}}>
              <ManageAccountsOutlinedIcon />
            </ItemIcon>
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
      </BoxStyle>
    </>
  );
};

export default Sidebar;
