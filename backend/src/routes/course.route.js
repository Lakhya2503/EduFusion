import { Router } from 'express'
import {
  createCourses,
  getCourses,
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
  [ verifyTeacherJWT, verifyAdminJWT],
  createCourses
);

router
  .route("/update-course")
  .post([verifyAdminJWT , verifyTeacherJWT], updateCurriculum);

router
  .route("/purchase-course").post(verifyStudentJWT,
    purchaseCourse);

// router.route("/get-courses").get(verifyStudentJWT, getCourses);
// router.route("/get-courses").get(verifyTeacherJWT, getCourses);
// router.route("/get-courses").get(verifyAdminJWT, getCourses);


router.route("/get-courses").get(getCourses);

export default router