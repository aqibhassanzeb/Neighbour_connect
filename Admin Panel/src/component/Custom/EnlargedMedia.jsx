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

const EnlargedMedia = ({ media, open, handleClose, setOpen }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} onClick={handleClose}>
          <HighlightOffIcon
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
            {media.map((med, index) => {
              if (med.media_type === "image") {
                return (
                  <img
                    key={index}
                    src={med.source}
                    width={300}
                    height={400}
                    alt="img"
                  />
                );
              } else {
                return (
                  <video
                    key={index}
                    src={med.source}
                    alt="Video"
                    width="300"
                    height="auto"
                    style={{ marginRight: "10px" }}
                    controls
                  />
                );
              }
            })}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default EnlargedMedia;
