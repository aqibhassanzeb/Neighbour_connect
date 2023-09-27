import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Tab,
  Tabs,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  CircularProgress,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Select, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import "../Option/Option.css";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetAllUsersQuery, useUserUpdateMutation } from "../../redux/api";
import moment from "moment";
import OptionA from "../Option/OptionA";
import OptionB from "../OptionB/OptionB";
import OptionC from "../OptionC/OptionC";
import OptionD from "../OptionD/OptionD";
import OptionE from "../OptionE/OptionE";

const columns = [
  { id: "name", label: "Name", minWidth: 80, option: { order: true } },
  { id: "code", label: "Email Adress", minWidth: 80 },
  {
    id: "population",
    label: "Home Address",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Suspension Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
    align: "center",
    format: (value, row) => <ActionsColumn row={row} />,
  },
];

function ConfirmationDialog({ open, onClose, onConfirm }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to perform this action?</DialogTitle>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ActionsColumn({ row }) {
  const [open, setOpen] = React.useState(false);
  const [updateUser, updateResp] = useUserUpdateMutation();

  const navigate = useNavigate();

  const handleConfirmation = () => {
    setOpen(true);
  };

  const handleShowPost = () => {
    navigate("/posts");
  };

  const handleRemoveConfirm = () => {
    handleRemove(row); // Call your remove logic here
    setOpen(false);
  };

  function handleRemove(row) {
    updateUser({ id: row.id, data: { isActive: true } });
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Button
        sx={{ backgroundColor: "#005D7A", width: 105, color: "white" }}
        variant="outlined"
        size="small"
        onClick={handleConfirmation}
      >
        Reactivate
      </Button>
      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleRemoveConfirm}
      />
    </div>
  );
}

function createData(name, code, population, size) {
  const density = population / size;
  const actions = columns
    .find((column) => column.id === "actions")
    .format(null, { name, code, population, size });

  return { name, code, population, size, actions };
}

const rows = [
  createData(
    "Laiba",
    "laiba123@gmail.com",
    "S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan",
    "12 May 2023"
  ),
  createData(
    "Madiha",
    "ma453@gmail.com",
    "Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan",
    "13 June 2022"
  ),
  createData(
    "Linta",
    "lh34@gmail.com",
    "house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan",
    "11 Sep 2022"
  ),
  createData(
    "Laraib",
    "laraibkhan@gmail.com",
    "house no.23 , s.no.4 ,3rd Floor Main University Road Sindh, Dadu,Sindh,Pakistan",
    "17 May 2023"
  ),
  createData(
    "Mahnoor",
    "mahi45@gmail.com",
    "House NO. 884. RAILWAY ROAD (SERVICE ROAD). I-10/2, Eminabad,Islamabad Capital Terr,Pakistan",
    "19 Oct 2022"
  ),
  createData(
    "Aiza",
    "ayeza12@gmail.com",
    "Sector 16 Korangi Industrial Area Sindh, Garh Maharaja,Sindh,Pakistan",
    "20 Aug 2022"
  ),
  createData(
    "Shifa",
    "shifA900@gmail.com",
    "6-A Gulberg II Punjab, Bhiria,Punjab,Pakistan",
    "1 Jan 2023"
  ),
  createData(
    "Sami",
    "Sami12@gmail.com",
    "House # C1/17 S.I.T.E. Sindh, Khairpur Nathan Shah,Sindh,Pakistan",
    "21 Nov 2022"
  ),
  createData(
    "Amna",
    "AmnaMalik3@gmail.com",
    "House no,89, F/165-A, Kaleke Mandi,Karachi,Pakistan",
    "15 Dec 2022"
  ),
  createData(
    "Riaz",
    "Riaz@gmail.com",
    "house#118 G.T.Road, Lodhran,Peshawar,Pakistan",
    "27 Feb 2023"
  ),
  createData(
    "Isma",
    "ismasohail23@gmail.com",
    "house #6-7Al-Syed ArcadeBlockl-5, Jahanian Shah,Karachi,Pakistan",
    "13 March 2023"
  ),
  createData(
    "Amra ",
    "amrafaisa76@gmail.com",
    "EFU House #45, KPT Building  Karachi Pakistan, Kamar Mushani,Karachi,Pakistan",
    "16 April 2023"
  ),
  createData(
    "Yasmin",
    "yasminriaz23@gmail.com",
    "A-159 House #12 GULISTAN-E-JOHOR, Daulatpur,Sindh,Pakistan",
    "19 May 2023"
  ),
  createData(
    "Shahbaz",
    "Shahbaz23@gmail.com",
    "House #23,G/1537/395 Tando Tayyab, Dhoro Naro,Sindh,Pakistan",
    "2 April 2023"
  ),
  createData(
    "Rimsha",
    "rimshakhan6@gmail.com",
    "house no.4, 1773-Railway Road Punjab, Daud Khel,Punjab,Pakistan",
    "1 Jun2 2023"
  ),
  createData(
    "Alina",
    "Alina34@gmail.com",
    "house no.232, 1773- Lodhran,Peshawa,Punjab,Pakistan",
    "1 Jun2 2023"
  ),
];
const useStyles = makeStyles({
  root: {
    //display:"flex",
    justifyContent: "center",
    justifyItems: "center",
    // alignContent:"center",
    // alignItems:"center",
    marginTop: "0%",
    marginLeft: "0%",
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ConfirmationDialogs({ open, onClose, onConfirm }) {
  const handleConfirms = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to perform this action?</DialogTitle>
      <DialogActions>
        <Button onClick={handleConfirms} color="primary">
          Confirm
        </Button>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function handleSuspendss(rowss) {
  // Logic for suspending a resident
}

function handleRemovess(rowss) {
  // Logic for removing a resident
}
function ActionsColumnss({ rowss }) {
  const [open, setOpen] = useState(false);

  const handleConfirmsationss = () => {
    setOpen(true);
  };

  const handleSuspendssConfirms = () => {
    handleSuspendss(rowss); // Call your suspend logic here
    setOpen(false);
  };

  const handleRemoveConfirms = () => {
    handleRemovess(rowss); // Call your remove logic here
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{ backgroundColor: "#005D7A", color: "white" }}
        variant="outlined"
        size="small"
        onClick={handleConfirmsationss}
      >
        Undo
      </Button>

      <ConfirmationDialogs
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleRemoveConfirms}
      />
    </div>
  );
}

const EnlargedImageView = ({ imageUrls, onClose }) => (
  <div
    className="modal"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      className="modal-content"
      style={{
        position: "relative",
        padding: "20px",
      }}
    >
      <span
        className="close"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
          color: "#aaa",
          cursor: "pointer",
        }}
      >
        &times;
      </span>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {imageUrls.map((imageUrl, index) =>
          imageUrl.endsWith(".mp4") ? (
            <video
              key={index}
              src={imageUrl}
              alt="User"
              width="300"
              height="auto"
              style={{ marginRight: "10px" }}
              controls
            />
          ) : (
            <img
              key={index}
              src={imageUrl}
              alt="User"
              width="300"
              height="auto"
              style={{ marginRight: "10px" }}
            />
          )
        )}
      </div>
    </div>
  </div>
);

const columnss = [
  {
    id: "image",
    label: "Image",
    minWidth: 80,
    format: (value) =>
      `<img src="${value}" alt="User" width="50" height="100" />`,
  },

  { id: "name", label: "Title", minWidth: 80, option: { order: true } },

  { id: "cat", label: "Category", minWidth: 80, option: { order: true } },
  {
    id: "population",
    label: "Location",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },

  { id: "code", label: "Description", minWidth: 80 },

  { id: "Type", label: "Price", minWidth: 80, option: { order: true } },

  {
    id: "de",
    label: "Deleted Date",
    minWidth: 90,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
    align: "center",
    format: (value, rowss) => <ActionsColumnss rowss={rowss} />,
  },
];

const ImageContainer = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  let imageElement;
  if (Array.isArray(images)) {
    imageElement = (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {images.map((imageUrl, index) => {
          if (imageUrl.endsWith(".mp4")) {
            return (
              <video
                key={index}
                src={imageUrl}
                alt="User"
                width="90"
                height="100"
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => handleImageClick(imageUrl)}
              />
            );
          } else {
            return (
              <img
                key={index}
                src={imageUrl}
                alt="User"
                width="90"
                height="100"
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => handleImageClick(imageUrl)}
              />
            );
          }
        })}
      </div>
    );
  } else {
    if (images.endsWith(".mp4")) {
      imageElement = (
        <video
          src={images}
          alt="User"
          width="90"
          height="100"
          style={{ cursor: "pointer" }}
          onClick={() => handleImageClick(images)}
        />
      );
    } else {
      imageElement = (
        <img
          src={images}
          alt="User"
          width="90"
          height="100"
          style={{ cursor: "pointer" }}
          onClick={() => handleImageClick(images)}
        />
      );
    }
  }

  return (
    <div>
      <img
        src={images[0]} // Show only the first image in the row
        alt="User"
        width="90"
        height="100"
        style={{ marginRight: "10px", cursor: "pointer" }}
        onClick={() => handleImageClick(images[0])}
      />
      {selectedImage && (
        <div className="enlarged-image-container">
          <EnlargedImageView imageUrls={images} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

function createDatas(image, cat, population, name, code, Type, de) {
  const actions = columnss
    .find((columnss) => columnss.id === "actions")
    .format(null, { image, cat, population, name, code, Type, de });

  return {
    image: <ImageContainer images={image} />,

    cat: cat,

    name: name,

    code: code,

    population: population,
    Type: Type,

    de: de,
    actions: actions,
  };
}

const rowsss = [
  createDatas(
    [
      require("../img/di1.jpg"),
      require("../img/dii.jpg"),
      require("../img/diii.jpg"),
    ],
    "Vintage Dinning Chair",
    "S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan",
    "Skilled",
    "Silver color chair",
    "2000Rs",
    "13 May 2023"
  ),
  createDatas(
    [
      require("../img/di2.jpg"),
      require("../img/ge.jpg"),
      require("../img/geee.jpg"),
    ],
    "Electric Geyser",
    "Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan",
    "Skilled",
    "Fast and new geyser",
    "6000Rs",
    "11 April 2023"
  ),
  createDatas(
    [
      require("../img/di4.jpeg"),
      require("../img/dii4.jpg"),
      require("../img/diii4.jpg"),
    ],
    "Plant Basket",
    "house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan",
    " Semi Skilled",
    "1 hanging plant basket ",
    "6000Rs",
    "3 March 2023"
  ),

  createDatas(
    [
      require("../img/di5.jpg"),
      require("../img/dii.jpg"),
      require("../img/diii5.jpg"),
    ],
    "Whitish drawer",
    "S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan",
    "Skilled",
    "5m height and 2 m width",
    "7000Rs",
    "5 April 2023"
  ),
  createDatas(
    [
      require("../img/di6.jpg"),
      require("../img/dii6.jpg"),
      require("../img/dii6.jpg"),
    ],
    "Electric oven",
    "Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan",
    " Semi Skilled",
    "3 left and 3 right side drawers",
    "9000Rs",
    "2 June 2023"
  ),
  createDatas(
    [
      require("../img/di1.jpg"),
      require("../img/dii.jpg"),
      require("../img/diii.jpg"),
    ],
    "Vintage Dinning Chair",
    "S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan",
    "Skilled",
    "Silver color chair",
    "2000Rs",
    "Monday-Wednesday",
    "8 July 2023"
  ),
  createDatas(
    [
      require("../img/di2.jpg"),
      require("../img/ge.jpg"),
      require("../img/geee.jpg"),
    ],
    "Electric Geyser",
    "Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan",
    "Skilled",
    "Fast and new geyser",
    "6000Rs",
    "5 Aug 2023"
  ),
  createDatas(
    [
      require("../img/di4.jpeg"),
      require("../img/dii4.jpg"),
      require("../img/diii4.jpg"),
    ],
    "Plant Basket",
    "house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan",
    " Semi Skilled",
    "1 hanging plant basket ",
    "6000Rs",
    "4 Sep 2023"
  ),

  createDatas(
    [
      require("../img/di5.jpg"),
      require("../img/dii.jpg"),
      require("../img/diii5.jpg"),
    ],
    "Whitish drawer",
    "S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan",
    "Skilled",
    "5m height and 2 m width",
    "7000Rs",
    "13 Jan 2023"
  ),
  createDatas(
    [
      require("../img/di6.jpg"),
      require("../img/dii6.jpg"),
      require("../img/dii6.jpg"),
    ],
    "Electric oven",
    "Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan",
    " Semi Skilled",
    "3 left and 3 right side drawers",
    "9000Rs",
    "7 May 2023"
  ),
];

const Signin = () => {
  const { data: users, isLoading, isError, error } = useGetAllUsersQuery();
  const inActiveUsers =
    users && users.data.filter((user) => user.isActive === false);

  const [selected, setSelected] = useState("Neighbor Watch");

  const [value, setValue] = useState(0);
  const history = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
    if (!(newFormValues.email.error && newFormValues.password.error)) {
      history("/dashboard");
    }
  };
  const styles = {
    container: {
      //height: 'calc(100vh - 80px)', // Adjust the height to fit your needs
      overflow: "auto",
    },
    tableContainer: {},
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email Address", width: 250 },
    {
      field: "address",
      headerName: "Home Address",
      sortable: false,
      width: 250,
      valueGetter: (params) => params.row.address?.name,
    },
    {
      field: "updatedAt",
      headerName: "Suspension Date",
      sortable: false,
      width: 150,
      valueFormatter: (params) =>
        moment(params?.value).format("dddd, DD MMMM YYYY"),
    },
    {
      field: "Actions",
      label: "Actions",
      minWidth: 120,
      align: "center",
      renderCell: (values) => <ActionsColumn row={values} />,
    },
  ];

  const classes = useStyles();
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
          Action History
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row">
        <Box>
          <Box className={classes.root}>
            <Box sx={{}}>
              <Box
                sx={{
                  borderBottom: 1,
                  position: "relative",
                  borderColor: "divider",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Suspended Accounts"
                    {...a11yProps(0)}
                    sx={{ marginLeft: 18 }}
                  />
                  <Tab
                    label="Deleted Content"
                    {...a11yProps(1)}
                    sx={{ marginLeft: 45 }}
                  />
                </Tabs>
                <Divider
                  orientation="vertical"
                  sx={{ position: "absolute", borderColor: "divider" }}
                />
              </Box>
              <TabPanel value={value} index={0}>
                <div style={styles.container}>
                  <Paper
                    sx={{
                      width: "83%",
                      overflow: "scroll",
                      position: "absolute",
                      top: isLoading ? 320 : 150,
                      left: isLoading ? 450 : 4,
                      background: isLoading && "transparent",
                      boxShadow: isLoading && "none",
                    }}
                  >
                    <Box>
                      {isLoading ? (
                        <Box>
                          <CircularProgress
                            style={{ color: "#005D7A", marginLeft: 80 }}
                            size={25}
                          />
                          <Typography sx={{ fontSize: 18, color: "#005D7A" }}>
                            🚀 Loading Residents
                          </Typography>
                        </Box>
                      ) : (
                        users && (
                          <DataGrid
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                            getRowId={(row) => row._id}
                            rows={inActiveUsers}
                            columns={columns}
                            getRowHeight={() => "auto"}
                          />
                        )
                      )}
                    </Box>
                  </Paper>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box>
                  <FormControl
                    sx={{
                      width: 200,
                      marginLeft: 2,
                      marginBottom: 2,
                    }}
                  >
                    <Select
                      labelId="select-category"
                      id="posts-select"
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      variant="outlined"
                      style={{ height: 35 }}
                    >
                      <MenuItem value={"Neighbor Watch"}>
                        Neighbor Watch
                      </MenuItem>
                      <MenuItem value={"Lost and Found"}>
                        Lost and Found
                      </MenuItem>
                      <MenuItem value={"Skills Hub"}>Skills Hub</MenuItem>
                      <MenuItem value={"Sell Zone"}>Sell Zone</MenuItem>
                      <MenuItem value={"Neighbor Forum"}>
                        Neighbor Forum
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  {selected === "Neighbor Watch" && (
                    <OptionA activeSkip={true} inActiveSkip={false} />
                  )}
                  {selected === "Lost and Found" && (
                    <OptionB activeSkip={true} inActiveSkip={false} />
                  )}
                  {selected === "Skills Hub" && (
                    <OptionC activeSkip={true} inActiveSkip={false} />
                  )}
                  {selected === "Sell Zone" && (
                    <OptionD activeSkip={true} inActiveSkip={false} />
                  )}
                  {selected === "Neighbor Forum" && (
                    <OptionE activeSkip={true} inActiveSkip={false} />
                  )}
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signin;
