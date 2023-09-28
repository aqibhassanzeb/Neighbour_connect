import { useState } from "react";
import EnlargedImageView from "./EnlargedImageView";

const ImageContainer = ({ images }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <img
        src={images[0]}
        alt="Media"
        width="80"
        height="80"
        style={{ cursor: "pointer" }}
        onClick={() => handleOpen()}
      />
      {open && (
        <EnlargedImageView
          images={images}
          open={open}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default ImageContainer;
