import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
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
import {
  useGetAllUsersReportsQuery,
  useUserUpdateMutation,
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
    updateUser({ id: row.row.reported_user._id, data: { isActive: false } });
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
        SusPend
      </Button>
      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleRemoveConfirm}
      />
    </div>
  );
}

export default function Story() {
  const { data, isLoading, isError, error } = useGetAllUsersReportsQuery();

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
      field: "reported_user",
      headerName: "Resident Name",
      width: 150,
      valueGetter: (params) => params.row.reported_user?.name,
    },
    {
      field: "reported_user_one",
      headerName: "Resident Email",
      width: 200,
      valueFormatter: (params) => {
        const item = data.find((item) => item._id === params.id);
        if (item) {
          return item.reported_user?.email;
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
          Spam Accounts
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
                  🚀 Loading Spam Accounts
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
                  getRowHeight={() => 80}
                />
              )
            )}
          </Box>
        </Paper>
      </div>
    </>
  );
}
