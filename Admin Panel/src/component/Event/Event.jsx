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
import {
  useGetAllPostsReportsQuery,
  useReportActionMutation,
} from "../../redux/api";
import moment from "moment";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Enlarged from "../Custom/Enlarged";
import VideocamIcon from "@mui/icons-material/Videocam";

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

function ActionsColumn({ row }) {
  const [updateAction, updateResp] = useReportActionMutation();

  const [open, setOpen] = useState(false);

  const handleConfirmations = () => {
    setOpen(true);
  };

  const handleSuspendConfirms = () => {
    handleSuspend(row); // Call your suspend logic here
    setOpen(false);
  };

  function handleRemove(row) {
    updateAction({
      _id: row._id,
      reported_post: row.reported_post._id,
      post_type: row.post_type,
    });
  }
  const handleRemoveConfirms = () => {
    handleRemove(row); // Call your remove logic here
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          backgroundColor: "#005D7A",
          color: "white",
          "&.Mui-disabled": {
            backgroundColor: "white",
            color: "black",
          },
        }}
        variant="outlined"
        size="small"
        onClick={handleConfirmations}
        disabled={row.delete_action}
      >
        {console.log(row.delete_action)}
        {row.delete_action ? "Deleted" : "Delete"}
      </Button>

      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleRemoveConfirms}
      />
    </div>
  );
}

const ImageContainer = ({ images }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const firstImage = images[0];

  let renderedContent;

  if (typeof firstImage === "string") {
    renderedContent = (
      <img onClick={handleOpen} src={firstImage} width={80} height={80} />
    );
  } else if (firstImage?.media_type === "image") {
    renderedContent = (
      <img
        onClick={handleOpen}
        src={firstImage?.source}
        width={80}
        height={80}
      />
    );
  } else if (firstImage?.media_type === "video") {
    renderedContent = (
      <div
        onClick={handleOpen}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <VideocamIcon />
        <video
          src={firstImage?.source}
          alt="Video"
          width="80"
          height="80"
          style={{ marginRight: "10px" }}
          controls
        />
      </div>
    );
  } else {
    renderedContent = (
      <div style={{ position: "relative" }}>
        <img src="/static/my-photo/nntt.png" width={80} height={80} />
        <span
          style={{
            position: "absolute",
            left: 4,
            fontWeight: 500,
            bottom: 0,
            color: "#005D7A",
          }}
        >
          Forum Post
        </span>
      </div>
    );
  }
  return (
    <div>
      {renderedContent}
      {open && (
        <Enlarged images={images} open={open} handleClose={handleClose} />
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
      headerName: "Media",
      width: 150,
      renderCell: (params) => (
        <ImageContainer
          images={
            params.row.reported_post.media ||
            params.row.reported_post.images ||
            params.row.reported_post.gallary_images ||
            []
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
      renderCell: (values) => <ActionsColumn row={values.row} />,
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
                <div style={{ height: 550 }}>
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
                </div>
              )
            )}
          </Box>
        </Paper>
      </div>
    </>
  );
}
