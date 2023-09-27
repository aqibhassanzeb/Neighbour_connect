import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import OptionA from "../Option/OptionA";
import OptionB from "../OptionB/OptionB";
import OptionC from "../OptionC/OptionC";

import { InputLabel, Select, makeStyles } from "@material-ui/core";
import OptionD from "../OptionD/OptionD";
import OptionE from "../OptionE/OptionE";
import { useNavigate } from "react-router-dom";

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

function handleSuspend(row) {
  // Logic for suspending a resident
}

function handleRemove(row) {
  // Logic for removing a resident
}
function ActionsColumns({ row }) {
  const [open, setOpen] = useState(false);

  const handleConfirmations = () => {
    setOpen(true);
  };

  const handleSuspendConfirms = () => {
    handleSuspend(row); // Call your suspend logic here
    setOpen(false);
  };

  const handleRemoveConfirms = () => {
    handleRemove(row); // Call your remove logic here
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{ backgroundColor: "#005D7A", color: "white" }}
        variant="outlined"
        size="small"
        onClick={handleConfirmations}
      >
        Delete
      </Button>

      <ConfirmationDialog
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

const columns = [
  {
    id: "image",
    label: "Image",
    minWidth: 80,
    format: (value) =>
      `<img src="${value}" alt="User" width="50" height="100" />`,
  },

  { id: "name", label: "Title", minWidth: 80, option: { order: true } },
  { id: "code", label: "Description", minWidth: 160 },
  {
    id: "population",
    label: "Location",
    minWidth: 80,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Date ",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "densities",
    label: "Time",
    minWidth: 70,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "dens",
    label: "Posted By",
    minWidth: 90,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
    align: "center",
    format: (value, row) => <ActionsColumns row={row} />,
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

function createData(image, name, code, population, size, densities, dens) {
  const density = population / size;
  const actions = columns
    .find((columns) => columns.id === "actions")
    .format(null, { image, name, code, population, size, densities, dens });

  return {
    image: <ImageContainer images={image} />,
    name: name,
    code: code,
    population: population,
    size: size,

    densities: densities,
    dens: dens,
    actions: actions,
  };
}

const useStyles = makeStyles({
  ASC: {
    position: "absolute",
    margin: "-4px 0px 0px 0px",
    cursor: "pointer",
    title: "pp",
  },
  DESC: {
    position: "absolute",
    margin: "4px 0px 0px 0px",
    cursor: "pointer",
  },
  containerStyle: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: "4px",
    padding: "4px",
  },

  inputStyle: {
    border: "none",
    outline: "none",
    padding: "8px",
    width: "100%",
  },

  iconStyle: {
    marginLeft: "8px",
    color: "#aaa",
    cursor: "pointer",
  },
});

const Users = () => {
  const styles = {
    container: {
      height: "calc(100vh - 80px)", // Adjust the height to fit your needs
      overflow: "auto",
    },

    tableContainer: {
      maxHeight: 600,
    },
  };
  const navigate = useNavigate();

  const handleShowPost = (path) => {
    // Navigate to the desired page
    navigate(path);
  };
  const [selected, setSelected] = useState("Neighbor Watch");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
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
          Posts
        </Typography>
      </Box>
      <Box sx={{ marginTop: 12 }}>
        {/* <select
            className="Space"
            value={selected}
            onChange={(e) => handleChange(e)}
          >
            {selected === "" && <option>Select Category</option>}
            <option>Lost and Found</option>
            <option>Neighbor Watch</option>
            <option>Skills Hub</option>
            <option>Sell Zone</option>
            <option>Neighbor Forum</option>
          </select> */}
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
            onChange={handleChange}
            variant="outlined"
            style={{ height: 35 }}
          >
            <MenuItem value={"Neighbor Watch"}>Neighbor Watch</MenuItem>
            <MenuItem value={"Lost and Found"}>Lost and Found</MenuItem>
            <MenuItem value={"Skills Hub"}>Skills Hub</MenuItem>
            <MenuItem value={"Sell Zone"}>Sell Zone</MenuItem>
            <MenuItem value={"Neighbor Forum"}>Neighbor Forum</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        {selected === "Neighbor Watch" && <OptionA />}
        {selected === "Lost and Found" && <OptionB />}
        {selected === "Skills Hub" && <OptionC />}
        {selected === "Sell Zone" && <OptionD />}
        {selected === "Neighbor Forum" && <OptionE />}
      </Box>
    </>
  );
};

export default Users;
