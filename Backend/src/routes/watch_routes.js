import express from "express";
const routes = express.Router();
import multer from "multer";
import { protect } from "../middleware/user_middleware.js";
import {
  watchCatCreate,
  watchCatDelete,
  watchCatGet,
  watchCatUpdate,
} from "../controllers/watchCat_controller.js";
import {
  addWatch,
  decreaseHelpful,
  deleteWatch,
  getAllWatch,
  getWatchByUser,
  increaseHelpful,
  updateMedia,
  updateWatch,
} from "../controllers/watch_controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// watch categories
routes.post("/watch_cat_create", watchCatCreate);
routes.put("/watch_cat_update/:_id", protect, watchCatUpdate);
routes.get("/watch_cat", protect, watchCatGet);
routes.delete("/watch_cat_delete/:_id", protect, watchCatDelete);

// neighbour watch
routes.post("/add_watch", upload.array("media", 3), addWatch);
routes.put("/update_watch/:_id", updateWatch);
routes.put("/update_media/:_id", upload.array("media", 3), updateMedia);
routes.delete("/delete_watch/:_id", deleteWatch);
routes.get("/watch/:user_id", getWatchByUser);
routes.get("/all_watch", getAllWatch);

// helpful
routes.post("/helpful/:_id", protect, increaseHelpful);
routes.post("/un_helpfull/:_id", protect, decreaseHelpful);

export default routes;
