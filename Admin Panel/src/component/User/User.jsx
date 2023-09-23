import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import moment from "moment";
import {
  Switch,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useGetAllUsersQuery, useUserUpdateMutation } from "../../redux/api";
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
    updateUser({ id: row.id, data: { isActive: false } });
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

export default function Users() {
  const { data: users, isLoading, isError, error } = useGetAllUsersQuery();

  const activeUsers =
    users && users.data.filter((user) => user.isActive === true);

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
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email Address", width: 250 },
    {
      field: "address",
      headerName: "Home Address",
      sortable: false,
      width: 200,
      valueGetter: (params) => params.row.address?.name,
    },
    {
      field: "createdAt",
      headerName: "Date Of Joining",
      sortable: false,
      width: 150,
      valueFormatter: (params) => moment(params?.value).format("DD MMMM YYYY"),
    },
    {
      field: "updatedAt",
      headerName: "Last Access",
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
          Residents
        </Typography>

        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 1,
            backgroundColor: "#fff",
            borderRadius: "4px",
            height: 23,
          }}
        >
          <SearchIcon color="action" sx={{ marginLeft: 1 }} />
          <TextField
            id="search"
            label="Search"
            variant="standard"
            sx={{
              marginLeft: 1,
              width: "100%",
              "& input": {
                paddingBottom: "17px", // Adjust the padding value as needed
              },
            }}
          />
        </Box> */}
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
                  rows={activeUsers}
                  columns={columns}
                  getRowHeight={() => "auto"}
                />
              )
            )}
          </Box>
        </Paper>
      </div>
    </>
  );
}
