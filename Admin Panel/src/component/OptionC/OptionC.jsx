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
  useGetAllSkillsQuery,
  useGetAllUsersQuery,
  useGetAllWatchesQuery,
  useUpdateSkillsMutation,
  useUpdateWatchMutation,
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
      <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={300}>
        {imageUrls.map((item, index) => (
          <ImageListItem key={index}>
            <img
              srcSet={`${item}?w=300&h=300&fit=crop&auto=format&dpr=2 2x`}
              src={`${item}?w=300&h=300&fit=crop&auto=format`}
              alt={item}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
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

export default function OptionC() {
  const { data, isLoading, isError, error } = useGetAllSkillsQuery();

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
      valueGetter: (params) => params.row?.location?.name,
    },
    { field: "skill_level", headerName: "Skill Level", width: 140 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "time",
      headerName: "Time ",
      sortable: false,
      width: 100,
      valueFormatter: (params) => moment(params?.value).format(" hh:mm A "),
    },
    {
      field: "price_per_hour",
      headerName: "Price",
      width: 100,
      valueFormatter: (params) => `${params.value} Rs`,
    },
    {
      field: "selected_day",
      headerName: "Days",
      width: 130,
      renderCell: (values) => (
        <Typography sx={{ fontSize: 14, wordWrap: "anywhere" }}>
          {extractDays(values.row.selected_day)}
        </Typography>
      ),
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
      renderCell: (values) => <ActionsColumn row={values} />,
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
