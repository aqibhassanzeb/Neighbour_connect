import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Modal from "@mui/material/Modal";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  useAddWatchCatMutation,
  useGetWatchCatsQuery,
  useUpdateWatchCatMutation,
} from "../../redux/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AddCat({ open, handleClose }) {
  const [addSell, addResp] = useAddWatchCatMutation();
  const [name, setName] = React.useState("");

  function handleSave() {
    addSell({ name })
      .then((res) => {
        setName("");
        handleClose();
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container maxWidth="xs" sx={{ mt: 20 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HighlightOffIcon
            onClick={handleClose}
            sx={{
              color: "black",
              fontSize: 30,
              position: "absolute",
              top: 10,
              right: 20,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
          <Container maxWidth="md" sx={{ mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontSize: 22, fontWeight: "bold", marginBottom: 1 }}
              >
                ADD CATEGORY
              </Typography>

              <TextField
                sx={{ marginTop: 2 }}
                id="outlined-basic"
                label="Category Name"
                variant="outlined"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {addResp.isLoading ? (
                <CircularProgress
                  style={{ color: "#005D7A", marginTop: 5 }}
                  size={25}
                />
              ) : (
                <Button
                  variant="contained"
                  component="span"
                  sx={{ backgroundColor: "#005D7A", marginTop: 2, width: 230 }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              )}
            </Box>
          </Container>
        </Box>
      </Modal>
    </Container>
  );
}

function ConfirmationDialog({ open, onClose, onConfirm }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete?</DialogTitle>
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

export default function WatchCat() {
  const { data, isLoading } = useGetWatchCatsQuery();

  const [updateCat] = useUpdateWatchCatMutation();

  const [open, setOpen] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const handleOpen = () => setOpenModel(true);
  const handleClose = () => setOpenModel(false);

  function handleDelete(id) {
    setDeleteId(id);
    setOpen(true);
  }

  const handleRemoveConfirm = () => {
    handleRemove();
    setOpen(false);
  };

  function handleRemove() {
    updateCat({ id: deleteId, data: { is_active: false } });
  }

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            marginLeft: 60,
            marginTop: 25,
          }}
        >
          {" "}
          <CircularProgress style={{ color: "#005D7A" }} size={25} />
        </Box>
      )}
      {data && data.data.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              marginLeft: 2,
              marginRight: 20,
              borderRadius: 1,
              marginBottom: 3,
            }}
          >
            <Button onClick={handleOpen} sx={{ color: "#005D7A" }}>
              <AddCircleOutlineIcon sx={{ marginRight: 2 }} /> Add New Category
            </Button>
          </Box>

          <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              useFlexGap
              sx={{ width: 1000 }}
            >
              {data?.data.map((item) => (
                <Box key={item._id} sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      backgroundColor: "#005D7A",
                      paddingX: 4,
                      paddingY: 1,
                      color: "white",
                      fontWeight: 500,
                      borderRadius: 2,
                    }}
                  >
                    {item.name}
                  </Box>
                  <IconButton
                    onClick={() => handleDelete(item._id)}
                    sx={{
                      color: "rgba(255, 255, 255, 0.54)",
                      backgroundColor: "white",
                    }}
                    aria-label={`info about ${item.name}`}
                  >
                    <DeleteOutlineIcon sx={{ color: "red" }} />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>
        </>
      )}
      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleRemoveConfirm}
      />
      <AddCat
        open={openModel}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </>
  );
}
