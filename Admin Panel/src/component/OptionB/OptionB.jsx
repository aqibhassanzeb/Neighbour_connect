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
} from "@mui/material";
import {
  useGetAllLostAndFoundQuery,
  useGetAllUsersQuery,
  useGetAllWatchesQuery,
  useUpdateLostAndFoundMutation,
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

const EnlargedImageView = ({ imageUrl, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <div style={{ display: "flex", gap: 10, height: "50vh", width: "50vw" }}>
        {imageUrl.map((image) => (
          <img
            src={image}
            alt="Enlarged User"
            className="enlarged-image"
            width={"100%"}
            height={"auto"}
            style={{ maxWidth: "400px" }}
          />
        ))}
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
  imageElement = (
    <img
      src={images[0]}
      alt="Media"
      width="80"
      height="80"
      style={{ cursor: "pointer" }}
      onClick={() => handleImageClick(images)}
    />
  );

  // if (Array.isArray(images)) {
  //   imageElement = (
  //     <div style={{ display: "flex", flexDirection: "row" }}>
  //       {images.map((imageUrl, index) => (
  //         <img
  //           key={index}
  //           src={imageUrl.source}
  //           alt="Media"
  //           width="50"
  //           height="100"
  //           style={{ marginRight: "10px", cursor: "pointer" }}
  //           onClick={() => handleImageClick(imageUrl)}
  //         />
  //       ))}
  //     </div>
  //   );
  // } else {
  // imageElement = (
  //   <img
  //     src={images}
  //     alt="User"
  //     width="50"
  //     height="100"
  //     style={{ cursor: "pointer" }}
  //     onClick={() => handleImageClick(images)}
  //   />
  // );
  // }

  return (
    <div>
      {imageElement}
      {selectedImage && (
        <div className="enlarged-image-container">
          <EnlargedImageView
            imageUrl={selectedImage}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
};

export default function OptionB() {
  const { data, isLoading, isError, error } = useGetAllLostAndFoundQuery();

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
        </Paper>
      </div>
    </>
  );
}
