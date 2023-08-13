import express from "express";
const routes = express.Router();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { protect } from "../middleware/user_middleware.js";

import {
  addSkill,
  deleteSkill,
  getSkillsByCat,
  getSkillsByUser,
  updateImages,
  updateSkill,
} from "../controllers/skill_controller.js";
import {
  skillCatCreate,
  skillCatDelete,
  skillCatGet,
  skillCatUpdate,
} from "../controllers/skillCat_controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// categories
routes.post("/skill_cat_create", protect, skillCatCreate);
routes.put("/skill_cat_update/:_id", protect, skillCatUpdate);
routes.get("/skill_cat", protect, skillCatGet);
routes.delete("/skill_cat_delete/:_id", protect, skillCatDelete);

routes.post("/add_skill", upload.array("images", 3), addSkill);
routes.put("/update_skill/:_id", updateSkill);
routes.put("/update_images/:_id", upload.array("images", 3), updateImages);

routes.delete("/delete_skill/:_id", deleteSkill);
routes.get("/skill_category/:category_name", protect, getSkillsByCat);
routes.get("/skills/:user_id", getSkillsByUser);

export default routes;
