import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
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
  useAddSkillCatMutation,
  useGetSkillCatsQuery,
  useUpdateSkillCatMutation,
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
  const [addSell, addResp] = useAddSkillCatMutation();

  const [imageUrl, setImageUrl] = React.useState(null);
  const [image, setImage] = React.useState();
  const [name, setName] = React.useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  function handleSave() {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    addSell(formData)
      .then((res) => {
        setName("");
        setImageUrl();
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
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded Image"
                  height="150"
                  width="150"
                  style={{ marginBottom: 15 }}
                />
              )}
              <label htmlFor="upload-image">
                <AddAPhotoOutlinedIcon
                  sx={{ fontSize: 40, "&:hover": { cursor: "pointer" } }}
                />

                <input
                  id="upload-image"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileUpload}
                />
              </label>
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

export default function SkillCat() {
  const { data, isLoading } = useGetSkillCatsQuery();

  const [updateCat] = useUpdateSkillCatMutation();

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
        <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
          <ImageList sx={{ width: 1030, height: 300 }} cols={6}>
            <ImageListItem key="Subheader" cols={6}>
              <ListSubheader component="div">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={handleOpen} sx={{ color: "#005D7A" }}>
                    <AddCircleOutlineIcon sx={{ marginRight: 2 }} />
                    Add New Category
                  </Button>
                </Box>
              </ListSubheader>
            </ImageListItem>
            {data?.data.map((item) => (
              <ImageListItem key={item._id}>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                </div>
                <ImageListItemBar
                  sx={{
                    backgroundColor: "#005D7A",
                    borderRadius: 2,
                    fontWeight: 500,
                  }}
                  title={item.name}
                  actionIcon={
                    <IconButton
                      onClick={() => handleDelete(item._id)}
                      sx={{
                        color: "rgba(255, 255, 255, 0.54)",
                        backgroundColor: "white",
                        marginRight: 1,
                      }}
                      aria-label={`info about ${item.name}`}
                    >
                      <DeleteOutlineIcon sx={{ color: "red" }} />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
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
