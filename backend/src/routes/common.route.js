import { Router } from "express";
import { verifyStudentJWT } from '../middleware/studentAuth.middleware.js'
import { createBlog, getBlog } from "../controller/blog.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { recieveMessage, sendMessage } from "../controller/message.controller.js";
import { studentAssigmentSubmit, teacherAssignmentForm } from "../controller/assignment.controller.js";

const router = Router();


//create bloge
router.route("/create/blog").post(
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
    verifyStudentJWT,
  createBlog
);

//get bloge
router.route("/get-blog").get(getBlog);

// send message
router.route('/send-message').post(sendMessage)

// recive message
router.route('/recieve-message').get(recieveMessage)

// assignment 
router.route("/assignment-given").post(teacherAssignmentForm);
router.route("/submit-assignment").post(upload.fields([
    {
      name: "assignmentType",
      maxCount: 1,
    },
  ]), studentAssigmentSubmit);


export default router