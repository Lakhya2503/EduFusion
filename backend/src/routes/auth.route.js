import { Router } from "express";
import {
   addBulkUsers,
   changeCurrentPassword,
   fetCurrentUser,
   forgetPasswordRequest,
   loggedInUser,
   loggedOut,
   registerUser,
   resendEmailVerification,
   resetForgetPassword,
   updateAvatar,
   updateUserFiled,
   verifyEmail
  } from "../controller/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { uploadAvatar, uploadFile } from '../middlewares/multer.middleware.js';

const router = Router()

router.route('/register').post(registerUser)

router.route('/login').post(loggedInUser)

router.route('/logout').post(  verifyJWT,loggedOut)

router.route('/fetch').get(  verifyJWT,fetCurrentUser)

router.route('/forget-password/request/:email').post(forgetPasswordRequest)

router.route('/forget-password/:token').post(resetForgetPassword)

router.route('/verify-email/:token').get(verifyEmail)

router.route("/resend-email/verification").post(verifyJWT, resendEmailVerification)

router.route("/change-current/password").post(verifyJWT, changeCurrentPassword)

router.route("/add-bulk-users/upload").post(uploadFile.fields([
    {
        name : "userList",
        maxCount : 1
    }
]),verifyJWT, addBulkUsers)

router.route("/avatar/upload").post(uploadAvatar.fields([
  {
      name : "avatar",
      maxCount : 1
  }
]),verifyJWT, updateAvatar)

router.route("/update/fields").post(verifyJWT, updateUserFiled)


export default router;
