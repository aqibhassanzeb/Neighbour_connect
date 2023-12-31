import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  getDataGridUtilityClass,
} from "@mui/x-data-grid";
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
  Modal,
} from "@mui/material";
import {
  useGetAllLostAndFoundDeletedQuery,
  useGetAllLostAndFoundQuery,
  useGetAllUsersQuery,
  useGetAllWatchesQuery,
  useUpdateLostAndFoundMutation,
  useUpdateWatchMutation,
  useUserUpdateMutation,
} from "../../redux/api";
import { useNavigate } from "react-router-dom";
import ImageContainer from "../Custom/ImageContainer";

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
  const [updatePost, updateResp] = useUpdateLostAndFoundMutation();

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

export default function OptionB({ activeSkip, inActiveSkip }) {
  const { data, isLoading, isError, error } = useGetAllLostAndFoundQuery(
    undefined,
    {
      skip: activeSkip,
    }
  );
  const { data: deletedData, isLoading: deleteLoading } =
    useGetAllLostAndFoundDeletedQuery(undefined, {
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
      renderCell: (values) => (
        <ImageContainer images={values.row.gallary_images} />
      ),
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
          activeSkip={activeSkip}
          inActiveSkip={inActiveSkip}
          row={values}
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
                rows={data.data}
                columns={columns}
                getRowHeight={() => "auto"}
              />
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
                  rows={deletedData.data}
                  columns={columns}
                  getRowHeight={() => "auto"}
                  localeText={{
                    noRowsLabel: "No Deleted Content Yet", // Change this text
                  }}
                />
              </div>
            )
          )}
        </Paper>
      </div>
    </>
  );
}
