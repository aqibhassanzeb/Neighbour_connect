import { Box, Modal } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const style = {
  position: "absolute",
  top: "55%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: 900,
  p: 4,
};

const Enlarged = ({ images, open, handleClose }) => {
  return (
    <div>
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
              color: "white",
              fontSize: 30,
              position: "absolute",
              top: 115,
              left: 30,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />

          <Box
            sx={{
              width: 500,
              height: 500,
              display: "flex",
              gap: 2,
              marginTop: 15,
            }}
          >
            {images.map((image, index) =>
              typeof image === "string" ? (
                <img key={index} src={image} width={300} height={400} />
              ) : image.media_type === "image" ? (
                <img key={index} src={image.source} width={300} height={400} />
              ) : (
                <video
                  key={index}
                  src={image.source}
                  alt="Video"
                  width="300"
                  height="auto"
                  style={{ marginRight: "10px" }}
                  controls
                />
              )
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default Enlarged;
