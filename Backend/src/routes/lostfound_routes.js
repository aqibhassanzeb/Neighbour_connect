import express from "express";
const routes = express.Router();

import { lostandfound_Create, lostandfound_Delete, lostandfound_Get, lostandfound_Update,lostandfoundLoc_Get} from "../controllers/lost_found.js";
import {protect} from "../middleware/user_middleware.js"
import { uploadMultiple } from "../middleware/pic_upload.js";
import { lostfoundCateg_Create, lostfoundCateg_Delete, lostfoundCateg_Get, lostfoundCateg_Update } from "../controllers/lostfoundCateg_controller.js";


// categories 
routes.post('/lostfoundCateg_create', protect,  lostfoundCateg_Create)
routes.put('/lostfoundCateg_update/:_id', protect,lostfoundCateg_Update)
routes.get('/lostfoundCateg',protect, lostfoundCateg_Get)
routes.delete('/lostfoundCateg_delete/:_id',protect, lostfoundCateg_Delete)

// lost and found items 
routes.post('/lostandfound_create', protect,uploadMultiple,  lostandfound_Create)
routes.put('/lostandfound_update/:_id', lostandfound_Update)
routes.get('/lostandfound', lostandfound_Get)
routes.get('/lostandfound_byloc',protect, lostandfoundLoc_Get)
routes.delete('/lostandfound_delete/:_id', lostandfound_Delete)





export default routes