import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import "../Option/Option.css";
import { useGetAllPostsReportsQuery } from "../../redux/api";
import moment from "moment";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

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
        {imageUrls.map((url, index) => {
          if (typeof url === "object") {
            return url.source.endsWith(".mp4") ? (
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
            );
          } else {
            return url.endsWith(".mp4") ? (
              <video
                key={index}
                src={url}
                alt="User"
                width="300"
                height="auto"
                style={{ marginRight: "10px" }}
                controls
              />
            ) : (
              <img
                key={index}
                src={url}
                alt="User"
                width="300"
                height="auto"
                style={{ marginRight: "10px" }}
              />
            );
          }
        })}
      </div>
    </div>
  </div>
);

const ImageContainer = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <img
        src={images[0].source || images[0]}
        alt="Image"
        width="90"
        height="100"
        style={{ marginRight: "10px", cursor: "pointer" }}
        onClick={() => setSelectedImage(images[0])}
      />
      {selectedImage && (
        <div className="enlarged-image-container">
          <EnlargedImageView imageUrls={images} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default function Event() {
  const { data, isLoading, isError, error } = useGetAllPostsReportsQuery();

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
      field: "images",
      headerName: "Posted by",
      width: 150,
      renderCell: (params) => (
        <ImageContainer
          images={
            params.row.reported_post.media ||
            params.row.reported_post.images ||
            params.row.reported_post.gallary_images
          }
        />
      ),
    },
    {
      field: "reported_post",
      headerName: "Posted by",
      width: 150,
      valueGetter: (params) => params.row.reported_post.posted_by.name,
    },
    {
      field: "reported_post_user_email",
      headerName: "Resident Email",
      width: 250,
      valueFormatter: (params) => {
        const item = data.find((item) => item._id === params.id);
        if (item) {
          return item.reported_post?.posted_by?.email;
        }
      },
    },
    {
      field: "reported_by",
      headerName: "Reported by",
      sortable: false,
      width: 250,
      renderCell: (values) => {
        const emails = values.row.reports.map((r) => r.email);
        return (
          <div
            style={{
              whiteSpace: "pre-line",
              maxHeight: "100px",
              overflowY: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: emails.join("<br />") }}
          />
        );
      },
    },
    {
      field: "reason",
      headerName: "Reason",
      sortable: false,
      width: 150,
      renderCell: (values) => {
        const reasons = values.row.reports.map((r) => r.reason);
        return (
          <div
            style={{
              whiteSpace: "pre-line",
              maxHeight: "100px",
              overflowY: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: reasons.join("<br />") }}
          />
        );
      },
    },
    {
      field: "no_of_reports",
      headerName: "No. Of Reports",
      sortable: false,
      width: 150,
      renderCell: (values) => <p>{values.row.reports.length}</p>,
    },
    {
      field: "reported_date",
      headerName: "Date of reported",
      sortable: false,
      width: 200,
      renderCell: (values) => {
        const dates = values.row.reports.map((r) =>
          moment(r.date).format("DD MMMM YYYY")
        );

        return (
          <div
            style={{
              whiteSpace: "pre-line",
              maxHeight: "100px",
              overflowY: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: dates.join("<br />") }}
          />
        );
      },
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
          position: "absolute",
          overflow: "scroll",
          Top: 40,
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
          Spam Content
        </Typography>
      </Box>
      <div style={styles.container}>
        <Paper
          sx={{
            width: "83%",
            overflow: "scroll",
            position: "absolute",
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
                  style={{ color: "#005D7A", marginLeft: 80 }}
                  size={25}
                />
                <Typography sx={{ fontSize: 18, color: "#005D7A" }}>
                  🚀 Loading Spam Content
                </Typography>
              </Box>
            ) : (
              data && (
                <DataGrid
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                  getRowId={(row) => row._id}
                  rows={data}
                  columns={columns}
                  getRowHeight={() => 120}
                />
              )
            )}
          </Box>
        </Paper>
      </div>
    </>
  );
}
