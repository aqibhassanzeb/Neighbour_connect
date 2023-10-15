import express from "express";
const routes = express.Router();
import multer from "multer";

import {
  lostandfound_Create,
  lostandfound_Delete,
  lostandfound_Deleted_Get,
  lostandfound_Get,
  lostandfound_Update,
  lostandfoundLoc_Get,
  updateImages,
} from "../controllers/lost_found.js";
import { protect } from "../middleware/user_middleware.js";
import { uploadMultiple } from "../middleware/pic_upload.js";
import {
  lostfoundCateg_Create,
  lostfoundCateg_Delete,
  lostfoundCateg_Get,
  lostfoundCateg_Update,
} from "../controllers/lostfoundCateg_controller.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const logMiddleware = (req, res, next) => {
  // console.log("Request URL:", req.originalUrl);
  // console.log("Request method:", req.method);
  // console.log("Request headers:", req.headers);
  // console.log("Request query parameters:", req.query);
  console.log("Request body:", req.body);
  console.log("Request files:", req.files || req.file); // Add this line to check the files received

  next();
};

// categories
routes.post("/lostfoundCateg_create", protect, lostfoundCateg_Create);
routes.put("/lostfoundCateg_update/:_id", protect, lostfoundCateg_Update);
routes.get("/lostfoundCateg", protect, lostfoundCateg_Get);
routes.delete("/lostfoundCateg_delete/:_id", protect, lostfoundCateg_Delete);

// lost and found items
routes.post(
  "/lostandfound_create",
  protect,
  upload.array("photos", 3),
  lostandfound_Create
);
routes.put(
  "/update_landf_images/:_id",
  upload.array("images", 3),
  updateImages
);
routes.put("/lostandfound_update/:_id", lostandfound_Update);
routes.get("/lostandfound", protect, lostandfound_Get);
routes.get("/lostandfound_deleted", protect, lostandfound_Deleted_Get);
routes.get("/lostandfound_byloc", protect, lostandfoundLoc_Get);
routes.delete("/lostandfound_delete/:_id", lostandfound_Delete);

export default routes;
