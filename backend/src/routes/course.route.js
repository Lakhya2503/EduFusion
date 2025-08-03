import { Router } from 'express'
import {
  createCourses,
  updateCurriculum
} from '../controller/courses.controller.js';
import { verifyAdminJWT } from '../middleware/adminAuth.middleware.js'
import { verifyTeacherJWT } from "../middleware/teacherAuth.middleware.js"
import { verifyStudentJWT } from '../middleware/studentAuth.middleware.js'
import { upload } from '../middleware/multer.middleware.js'
import { purchaseCourse } from '../controller/purchase.controller.js';

const router = Router()

router.route("/create/new").post(
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  verifyAdminJWT || verifyTeacherJWT,createCourses
);

router
  .route("/update-course")
  .post(verifyAdminJWT || verifyTeacherJWT, updateCurriculum);

router
  .route("/purchase-course").post(verifyStudentJWT,purchaseCourse);

export default router