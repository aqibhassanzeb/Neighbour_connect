import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";

import "../Option/Option.css";
import { useGetAllSellsQuery, useUpdateSellsMutation } from "../../redux/api";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
function ActionsColumn({ row }) {
  const [open, setOpen] = React.useState(false);
  const [updatePost, updateResp] = useUpdateSellsMutation();

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
    updatePost({ id: row.id, data: { is_active: false } });
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
        Delete
      </Button>
      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleRemoveConfirm}
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

const OptionA = () => {
  const { data, isLoading, isError, error } = useGetAllSellsQuery();
  const styles = {
    container: {
      height: "calc(100vh - 80px)", // Adjust the height to fit your needs
      overflow: "auto",
    },

    tableContainer: {
      // maxHeight: 600,
    },
  };
  const classes = useStyles();

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (values) => <ImageContainer images={values.row.images} />,
    },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      valueGetter: (params) => params.row?.category?.name,
    },
    {
      field: "location",
      headerName: "Location",
      sortable: false,
      width: 200,
      valueGetter: (params) => params.row?.location?.name,
    },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      valueFormatter: (params) => `${params.value} Rs`,
    },
    {
      field: "posted_by",
      headerName: "Posted By",
      sortable: false,
      width: 220,
      valueFormatter: (params) => params.value.email,
    },
    {
      field: "Actions",
      label: "Actions",
      minWidth: 120,
      align: "center",
      renderCell: (values) => <ActionsColumn row={values} />,
    },
  ];

  return (
    <div style={styles.container}>
      <Paper
        sx={{
          width: "83%",
          overflow: "scroll",
          top: isLoading ? 320 : 90,
          left: isLoading ? 450 : 4,
          background: isLoading && "transparent",
          boxShadow: isLoading && "none",
        }}
      >
        <Box>
          {isLoading ? (
            <Box>
              <CircularProgress
                style={{ color: "#005D7A", marginLeft: 500, marginTop: 200 }}
                size={25}
              />
              <Typography
                sx={{ fontSize: 18, color: "#005D7A", marginLeft: 55 }}
              >
                🚀 Loading Posts
              </Typography>
            </Box>
          ) : (
            data && (
              <DataGrid
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 100 },
                  },
                }}
                getRowId={(row) => row._id}
                rows={data}
                columns={columns}
                getRowHeight={() => "auto"}
              />
            )
          )}
        </Box>
      </Paper>
    </div>
  );
};
export default OptionA;
