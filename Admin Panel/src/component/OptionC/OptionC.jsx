import * as React from "react";
import {
  DataGrid,
  GridToolbar,
  getDataGridUtilityClass,
} from "@mui/x-data-grid";
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
  ImageList,
  ImageListItem,
} from "@mui/material";
import {
  useGetAllSkillsDeletedQuery,
  useGetAllSkillsQuery,
  useGetAllUsersQuery,
  useGetAllWatchesQuery,
  useUpdateSkillsMutation,
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

function ActionsColumn({ row, activeSkip }) {
  const [open, setOpen] = React.useState(false);
  const [updatePost, updateResp] = useUpdateSkillsMutation();

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

function RenderDays(row) {
  const days = row?.values?.row?.days?.filter(
    (day) =>
      day.timeSlots &&
      day.timeSlots[0].startHours !== null &&
      day.timeSlots[0].endHours !== null
  );
  return (
    <div>
      {days?.map((day, index) => (
        <div key={index}>
          <span>🌄 {day.name} </span>
          {day.timeSlots.map((timeSlot, timeIndex) => (
            <span key={timeIndex}>
              {moment(timeSlot.startHours).format("LT")},{" - "}
              {moment(timeSlot.startHours).format("LT")} {"  "}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function OptionC({ activeSkip, inActiveSkip }) {
  const { data, isLoading, isError, error } = useGetAllSkillsQuery(undefined, {
    skip: activeSkip,
  });
  const { data: deletedData, isLoading: deleteLoading } =
    useGetAllSkillsDeletedQuery(undefined, {
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
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (values) => <ImageContainer images={values.row.images} />,
    },
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
      valueGetter: (params) => params.row?.location,
    },
    { field: "skill_level", headerName: "Skill Level", width: 140 },
    { field: "description", headerName: "Description", width: 200 },
    // {
    //   field: "time",
    //   headerName: "Time ",
    //   sortable: false,
    //   width: 100,
    //   valueFormatter: (params) => moment(params?.value).format(" hh:mm A "),
    // },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) =>
        `Rs ${params.row.price} Per ${params.row.price_unit}`,
    },
    {
      field: "selected_day",
      headerName: "Days",
      width: 130,
      renderCell: (values) => <RenderDays values={values} />,
    },
    {
      field: "posted_by",
      headerName: "Posted By",
      sortable: false,
      width: 280,
      renderCell: (values) => (
        <Box>
          <Typography sx={{ fontSize: 14 }}>
            {values.row.posted_by.email}
          </Typography>
          <Typography sx={{ fontSize: 12 }}>
            {values.row.posted_by.endorse_count} Endorsement
          </Typography>
        </Box>
      ),
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

export const extractDays = (inputDays) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const processedArray = [];
  let currentRange = [];

  for (const day of inputDays) {
    const dayIndex = daysOfWeek.indexOf(day);

    if (currentRange.length === 0) {
      currentRange.push(day);
    } else if (
      dayIndex ===
      (daysOfWeek.indexOf(currentRange[currentRange.length - 1]) + 1) % 7
    ) {
      currentRange.push(day);
    } else {
      if (currentRange.length >= 3) {
        processedArray.push(
          `${currentRange[0]} to ${currentRange[currentRange.length - 1]}`
        );
      } else {
        processedArray.push(...currentRange);
      }
      currentRange = [day];
    }
  }

  if (currentRange.length >= 3) {
    processedArray.push(
      `${currentRange[0]} to ${currentRange[currentRange.length - 1]}`
    );
  } else {
    processedArray.push(...currentRange);
  }

  return processedArray.join(" ");
};
