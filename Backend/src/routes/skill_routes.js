import express from "express";
const routes = express.Router();
import multer from "multer";
import { protect } from "../middleware/user_middleware.js";

import {
  addSkill,
  deleteSkill,
  getAllDeletedSkills,
  getAllSkills,
  getSkillsByCat,
  getSkillsByUser,
  increaseEndorse,
  UnEndorse,
  updateImages,
  updateSkill,
} from "../controllers/skill_controller.js";
import {
  skillCatCreate,
  skillCatDelete,
  skillCatGet,
  skillCatSearch,
  skillCatUpdate,
} from "../controllers/skillCat_controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// categories
routes.post(
  "/skill_cat_create",
  [protect, upload.single("image")],
  skillCatCreate
);
routes.put("/skill_cat_update/:_id", protect, skillCatUpdate);
routes.get("/skill_cat", protect, skillCatGet);
routes.delete("/skill_cat_delete/:_id", protect, skillCatDelete);
routes.get("/skill_cat_search", skillCatSearch);

// skill hub
routes.post("/add_skill", upload.array("photos", 3), addSkill);
routes.put("/update_skill/:_id", updateSkill);
routes.put("/update_images/:_id", upload.array("images", 3), updateImages);
routes.delete("/delete_skill/:_id", deleteSkill);
routes.get("/skill_category/:catId", protect, getSkillsByCat);
routes.get("/skills/:user_id", getSkillsByUser);
routes.get("/all_skills", getAllSkills);
routes.get("/all_skills_deleted", getAllDeletedSkills);

// endorse
routes.post("/endorse/:_id", protect, increaseEndorse);
routes.post("/unendorse/:_id", protect, UnEndorse);

export default routes;
