import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import moment from "moment";
import {
  Switch,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  useGetAllDeletedWatchesQuery,
  useGetAllWatchesQuery,
  useUpdateWatchMutation,
} from "../../redux/api";
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

function ActionsColumn({ row, activeSkip, inActiveSkip }) {
  const [open, setOpen] = React.useState(false);
  const [updatePost, updateResp] = useUpdateWatchMutation();

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
    updatePost({ id: row.id, data: { is_active: activeSkip ? true : false } });
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
        {activeSkip ? "Undo" : "Delete"}
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
        {imageUrls.map((url, index) =>
          url.source.endsWith(".mp4") ? (
            <video
              key={index}
              src={url.source}
              alt="User"
              width="300"
              height="auto"
              style={{ marginRight: "10px" }}
              controls
            />
          ) : (
            <img
              key={index}
              src={url.source}
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
  const [selectedImage, setSelectedImage] = React.useState(null);

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
        {images.map((url, index) => {
          if (url.source.endsWith(".mp4")) {
            return (
              <video
                key={index}
                src={url.source}
                alt="Video"
                width="90"
                height="100"
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => handleImageClick(url.source)}
              />
            );
          } else {
            return (
              <img
                key={index}
                src={url.source}
                alt="Image"
                width="90"
                height="100"
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => handleImageClick(url.source)}
              />
            );
          }
        })}
      </div>
    );
  }

  return (
    <div>
      <img
        src={images[0].source}
        alt="Image"
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

export default function OptionA({ activeSkip, inActiveSkip }) {
  const { data, isLoading } = useGetAllWatchesQuery(undefined, {
    skip: activeSkip,
  });

  const { data: deletedData, isLoading: deleteLoading } =
    useGetAllDeletedWatchesQuery(undefined, {
      skip: inActiveSkip,
    });

  const styles = {
    container: {
      height: "calc(100vh - 80px)", // Adjust the height to fit your needs
      overflow: "auto",
    },
    tableContainer: {
      maxHeight: 600,
    },
  };

  const columns = [
    {
      field: "name",
      headerName: "Image",
      width: 100,
      renderCell: (values) => <ImageContainer images={values.row.media} />,
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "location",
      headerName: "Location",
      sortable: false,
      width: 200,
      valueGetter: (params) => params.row?.location?.name,
    },
    {
      field: "createdAt",
      headerName: "Date & Time ",
      sortable: false,
      width: 150,
      valueFormatter: (params) =>
        moment(params?.value).format("DD MMMM YYYY, hh:mm A "),
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
      renderCell: (values) => (
        <ActionsColumn
          row={values}
          activeSkip={activeSkip}
          inActiveSkip={inActiveSkip}
        />
      ),
    },
  ];

  return (
    <>
      <div style={styles.container}>
        <Paper
          sx={{
            width: "83%",
            overflow: "scroll",
            // position: "absolute",
            top: isLoading || deleteLoading ? 320 : 90,
            left: isLoading || deleteLoading ? 450 : 4,
            background: isLoading || deleteLoading ? "transparent" : "",
            boxShadow: isLoading || deleteLoading ? "none" : "",
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
                <div style={{ height: 520 }}>
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
                </div>
              )
            )}
            {deleteLoading ? (
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
              deletedData && (
                <div style={{ height: 450 }}>
                  <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 100 },
                      },
                    }}
                    getRowId={(row) => row._id}
                    rows={deletedData}
                    columns={columns}
                    getRowHeight={() => "auto"}
                    localeText={{
                      noRowsLabel: "No Deleted Content Yet", // Change this text
                    }}
                  />
                </div>
              )
            )}
          </Box>
        </Paper>
      </div>
    </>
  );
}
