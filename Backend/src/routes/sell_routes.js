import express from "express";
const routes = express.Router();
import multer from "multer";
import { protect } from "../middleware/user_middleware.js";

import {
  addSell,
  deleteSell,
  getAllItems,
  getSellsByCat,
  getSellsByUser,
  markSolded,
  updateImages,
  updateSell,
} from "../controllers/sell_controller.js";
import {
  CatGet,
  Create,
  Update,
  Delete,
} from "../controllers/sellCat_controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// categories
routes.post("/sell_cat_create", [protect, upload.single("image")], Create);
routes.put("/sell_cat_update/:_id", protect, Update);
routes.get("/sell_cat", protect, CatGet);
routes.delete("/sell_cat_delete/:_id", protect, Delete);

// Sell  hub
routes.post("/add_sell", upload.array("photos", 3), addSell);
routes.put("/update_sell/:_id", updateSell);
routes.put("/update_images/:_id", upload.array("images", 3), updateImages);
routes.delete("/delete_sell/:_id", deleteSell);
routes.get("/sell_category/:_id", protect, getSellsByCat);
routes.get("/sells/:user_id", getSellsByUser);
routes.get("/all_items", protect, getAllItems);

// Mark Sold
routes.post("/solded/:_id", protect, markSolded);

export default routes;
