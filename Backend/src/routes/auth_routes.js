import express from "express";
const routes = express.Router();

import {
    userSignup,
    userLogin,
    userUpdate,
    userGet,
    forgotPass,
    userVerify,
    verifyForgotcode,
} from "../controllers/auth_controller.js"
import { uploadMultiple, uploadSingle } from "../middleware/pic_upload.js";
import { protect } from "../middleware/user_middleware.js";
import { uploadPicture, uploadPictures } from "../controllers/upload_pic.js";

routes.post('/user_signup', userSignup)
routes.put('/user_verify', userVerify)
routes.put('/user_update/:_id', userUpdate)
routes.get('/user_get', userGet)
routes.post('/user_login', userLogin)
routes.put('/reset_password', forgotPass)
routes.put('/reset_passcode', verifyForgotcode)


// picture upload 

routes.post('/picture_upload',uploadSingle, uploadPicture)
routes.post('/picture_uploads',uploadMultiple, uploadPictures)



export default routes