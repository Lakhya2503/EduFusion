import { Router } from "express"
import {
  loggedOutAdmin,
  getAdmin,
  logginAdmin,
  registerAdmin,
  refeshAccessToken,
  passwordUpdate,
  // updateAdmin,
} from "../controller/admin.controller.js";
import { upload } from '../middleware/multer.middleware.js'
import { verifyAdminJWT } from '../middleware/adminAuth.middleware.js'

const router = Router()

// admin router
router.route("/admin/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 2,
    },
  ]),
  registerAdmin
);

router.route("/admin/login").post(logginAdmin);
router.route("/admin/logout").post(verifyAdminJWT, loggedOutAdmin);
router.route("/admin/:id").get(verifyAdminJWT, getAdmin);
router.route("/admin/refresh-token").post(verifyAdminJWT, refeshAccessToken);
router.route("/admin/change-password").post(verifyAdminJWT, passwordUpdate);


// router.route("/admin/update/:id").post(verifyAdminJWT, updateAdmin);




export default router