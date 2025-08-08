import { Router } from "express"
import { upload } from '../middleware/multer.middleware.js'
// admin import
import {
  loggedOutAdmin,
  getAdmin,
  logginAdmin,
  registerAdmin,
  adminPasswordUpdate,
  adminRefeshAccessToken,
} from "../controller/admin.controller.js";
import { verifyAdminJWT } from '../middleware/adminAuth.middleware.js'

// teacher import
import { verifyTeacherJWT } from "../middleware/teacherAuth.middleware.js";
import {
  getTeacher,
  loggedInTeacher,
  loggedOutTeacher,
  registerTeacher,
  teacherPasswordUpdate,
  teacherRefeshAccessToken
} from "../controller/teacher.controller.js";

// student import

import {
  registerStudent,
  loggedInStudent,
  loggedOutStudent,
  studentPasswordUpdate,
  studentRefeshAccessToken,
  getStudent,
} from "../controller/student.controller.js";
import { verifyStudentJWT } from "../middleware/studentAuth.middleware.js";


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

router.route("/admin/login").post(upload.none(), logginAdmin);

router.route("/admin/logout").post(verifyAdminJWT, loggedOutAdmin);

router.route("/admin/current-user").get(verifyAdminJWT, getAdmin);

router
  .route("/admin/refresh-token")
  .post(verifyAdminJWT, adminRefeshAccessToken);

router
  .route("/admin/change-password")
  .post(verifyAdminJWT, adminPasswordUpdate);


// teacher router
router.route("/teacher/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 2,
    },
  ]),
  verifyAdminJWT,
  registerTeacher
);

router.route("/teacher/login").post(upload.none(), loggedInTeacher);

router.route("/teacher/logout").post(verifyTeacherJWT, loggedOutTeacher);

router.route("/teacher/current-user").get(verifyTeacherJWT, getTeacher);





router
  .route("/teacher/refresh-token")
  .post(verifyTeacherJWT, teacherRefeshAccessToken);

router
  .route("/teacher/change-password")
  .post(verifyTeacherJWT, teacherPasswordUpdate);

// student router

router.route("/student/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 2,
    },
  ]),
  verifyAdminJWT || verifyTeacherJWT,  
  registerStudent
);

router.route("/student/login").post(upload.none(), loggedInStudent);

router.route("/student/logout").post(verifyStudentJWT, loggedOutStudent);

router.route("/student/current-user").get(verifyStudentJWT, getStudent);
  
router
  .route("/student/refresh-token")
  .post(verifyStudentJWT, studentRefeshAccessToken);

router
  .route("/student/change-password")
  .post(verifyStudentJWT, studentPasswordUpdate);


export default router