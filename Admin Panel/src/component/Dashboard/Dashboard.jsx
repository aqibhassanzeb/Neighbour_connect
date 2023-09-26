import styled from "@emotion/styled";
import { Avatar, Button, makeStyles, Menu, Paper } from "@material-ui/core";
import {
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import pp2 from "../img/pp2.jpeg";
import pp33 from "../img/pp33.jpeg";
import p4 from "../img/p4.jpeg";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { Link } from "react-router-dom";

import HistoryIcon from "@mui/icons-material/History";

import "./Das.css";
import {
  AreaChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { RecentMessage } from "../../config/config";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserStatisticsQuery } from "../../redux/api";

// chart data

const dataDist = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "H",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "I",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "J",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "K",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "L",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
];
const Buttons = ({ type }) => {
  return <button className={"widgetLargeButton " + type}>{type}</button>;
};
const CircleData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
// -------

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    height: 40,
  },
  icon: {
    width: 90,
    height: 40,
  },
});
const datas = [
  { name: "Laiba", email: "laiba@", age: 50 },
  { name: "Laraib", email: "laraiba@", age: 21 },
];
const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#5c6bc0",
  width: "60%",
}));
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  position: "relative",
  // padding:"0 10px",
  // borderRadius:theme.shape.borderRadius,
  width: "10",
}));
const Dashboard = () => {
  const navigate = useNavigate();
  const { name, image } = useSelector((state) => state.authReducer.activeUser);
  const { data, isLoading } = useGetUserStatisticsQuery();

  const handleShowPost = () => {
    // Navigate to the desired page
    navigate("/posts");
  };

  const handleShowPosts = () => {
    // Navigate to the desired page
    navigate("/story");
  };
  const handleShowPostss = () => {
    // Navigate to the desired page
    navigate("/events");
  };
  const handleShowPostsss = () => {
    // Navigate to the desired page
    navigate("/users");
  };
  const handleShowPostssz = () => {
    // Navigate to the desired page
    navigate("/playlist");
  };
  const history = useNavigate();
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [menuBasic, setBasicMenu] = useState(false);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box sx={{}}>
      <Box
        sx={{
          margin: "0px 0px 10px 0px",
          width: "100%",
          height: 80,
          backgroundColor: "#005D7A",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          top: 1,
          bottom: 30,
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
          Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              // m: 1.5,
              width: 220,
              height: 60,
              borderRadius: 5,
              marginLeft: 20,
            },
          }}
        >
          <Paper elevation={0}>
            <ListItem>
              <ListItemAvatar
                sx={{ position: "relative", cursor: "pointer" }}
                onClick={(e) => setBasicMenu(true)}
              >
                <Avatar alt={name} src={image} />
              </ListItemAvatar>

              <ListItemText primary={name} />
            </ListItem>
          </Paper>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={menuBasic}
            onClose={(e) => setBasicMenu(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ margin: "80px 0px 0px -100px" }}
          >
            <MenuItem onClick={(e) => history("/profile")}>My account</MenuItem>
            <MenuItem onClick={(e) => history("/")}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box sx={{ margin: 3 }}>
        <Stack direction={"row"} alignItems={"center"} gap={2}></Stack>
        <Stack direction={"row"} alignItems={"center"} gap={7} marginTop={3}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1.5,
                width: 174,
                height: 160,
              },
            }}
          >
            <Paper
              elevation={1}
              sx={{ cursor: "pointer" }}
              onClick={handleShowPostsss}
            >
              <PersonRoundedIcon
                sx={{
                  position: "absolute",
                  width: 100,
                  height: 90,
                  color: "#e3f2fd",
                  bgcolor: "#26a69a",
                  margin: "15px 0px 0px 35px",
                  borderRadius: 3,
                }}
              />
              <Typography
                variant="6"
                sx={{
                  position: "absolute",
                  color: "#005D7A",
                  margin: "120px 0px 0px 2px",
                  fontSize: 20,
                  fontWeight: "bold",
                  left: 75,
                }}
              >
                Residents
              </Typography>
            </Paper>
            <Paper elevation={1} onClick={handleShowPost}>
              <BookmarkAddRoundedIcon
                sx={{
                  position: "relative",
                  width: 100,
                  height: 90,
                  color: "#e3f2fd",
                  bgcolor: "#ff8a65",
                  margin: "15px 0px 0px 35px",
                  borderRadius: 3,
                }}
              />
              <Typography
                variant="6"
                sx={{
                  position: "absolute",
                  color: "#005D7A",
                  margin: "120px 0px 0px 10px",
                  fontSize: 20,
                  fontWeight: "bold",
                  left: 285,
                }}
              >
                Posts
              </Typography>
            </Paper>
            <Paper elevation={1} onClick={handleShowPosts}>
              <PersonRemoveOutlinedIcon
                sx={{
                  position: "relative",
                  width: 100,
                  height: 90,
                  color: "#e3f2fd",
                  bgcolor: "#ffb6c1",
                  margin: "15px 0px 0px 35px",
                  borderRadius: 3,
                }}
              />
              <Typography
                variant="6"
                sx={{
                  position: "absolute",
                  color: "#005D7A",
                  margin: "120px 0px 0px 10px",
                  fontSize: 20,
                  fontWeight: "bold",
                  left: 435,
                }}
              >
                Spam Accounts
              </Typography>
            </Paper>
            <Paper elevation={1} onClick={handleShowPostss}>
              <ContentPasteOffOutlinedIcon
                sx={{
                  position: "relative",
                  width: 100,
                  height: 90,
                  color: "#e3f2fd",
                  bgcolor: "#87C1FF",
                  margin: "15px 0px 0px 35px",
                  borderRadius: 3,
                }}
              />
              <Typography
                variant="6"
                sx={{
                  position: "absolute",
                  color: "#005D7A",
                  margin: "120px 0px 0px 10px",
                  fontSize: 20,
                  fontWeight: "bold",
                  left: 638,
                }}
              >
                Spam Content
              </Typography>
            </Paper>
            <Paper elevation={1} onClick={handleShowPostssz}>
              <HistoryIcon
                sx={{
                  position: "relative",
                  width: 100,
                  height: 90,
                  color: "#e3f2fd",
                  bgcolor: "#9575cd",
                  margin: "15px 0px 0px 35px",
                  borderRadius: 3,
                }}
              />

              <Typography
                variant="6"
                sx={{
                  position: "absolute",
                  color: "#005D7A",
                  margin: "120px 0px 0px 10px",
                  fontSize: 20,
                  fontWeight: "bold",
                  left: 838,
                }}
              >
                Action History
              </Typography>
            </Paper>
          </Box>
        </Stack>

        {/* <Box>
                <table style={{ margin: '10px', color: 'blue' , border:'1px solid #005D7A',}}>
      <thead style={{  backgroundColor: '#005D7A',color: 'white' , }}>
        <tr >
          <th>Past 24 hours</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((item, indexs) => (
          <tr key={indexs}>
            <td>
              <img src={item.image} alt="Avatar" width="50" height="50" />
            </td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </Box> */}

        <Stack direction={"row"} gap={7}>
          <Box
            sx={{
              bgcolor: "#fff",
              marginLeft: 2,
              marginTop: 3,
              borderRadius: 5,
            }}
          >
            <BarChart
              width={660}
              height={300}
              data={data}
              margin={{
                top: 0,
                right: 40,
                left: 40,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="month"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <Bar dataKey="Accounts" fill="#005D7A" />
            </BarChart>
          </Box>

          <Box
            sx={{
              bgcolor: "#fff",
              position: "relative",
              marginLeft: 2,
              marginTop: 3,
              borderRadius: 5,
              width: 220,
              height: 300,
            }}
          >
            <Typography sx={{ fontSize: 14, margin: "10px 0px 0px 10px" }}>
              Recent Logins
            </Typography>
            <Box sx={{ overflowY: "scroll", height: 220 }}>
              {RecentMessage.map((value) => (
                <ListItem
                  sx={{
                    ":hover": {
                      bgcolor: "#005D7A",
                      height: 50,
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt="Pankaj" src={value.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.primaryText}
                    secondary={value.secondaryText}
                  />
                </ListItem>
              ))}
              {/* sx={{width:200,height:20,bgcolor:"#90a4ae",position:"absolute",}} */}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
