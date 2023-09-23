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
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetAllForumsQuery, useUpdateForumMutation } from "../../redux/api";
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
  const [updatePost, updateResp] = useUpdateForumMutation();

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
  const styles = {
    container: {
      height: "calc(100vh - 80px)", // Adjust the height to fit your needs
      overflow: "auto",
    },

    tableContainer: {
      maxHeight: 600,
    },
  };
  const classes = useStyles();
  const { data, isLoading, isError, error } = useGetAllForumsQuery();

  const columns = [
    { field: "topic", headerName: "Topic", width: 200 },
    { field: "description", headerName: "Description", width: 200 },

    {
      field: "replies",
      headerName: "Reply By",
      sortable: false,
      width: 220,
      valueFormatter: (params) =>
        params.value[params.value.length - 1].reply_by.name,
    },
    {
      field: "replies_2",
      headerName: "Reply Message",
      sortable: false,
      width: 220,
      valueFormatter: (params) => {
        const item = data.find((item) => item._id === params.id);
        if (item) {
          return item.replies[item.replies.length - 1].text;
        }
      },
      // valueFormatter: (params) => params.value[params.value.length - 1].text,
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
  console.log(data);
  return (
    <div style={styles.container}>
      <Paper sx={{ width: "83%", overflow: "scroll" }}>
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
