import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from '../models/courses.model.js'
import { Teacher } from "../models/teacher.model.js";
import { ApiError } from "../utils/ApiError.js";
import { TeacherAssignmentForm } from "../models/teacherAssigments.model.js";
import { Student } from "../models/student.model.js";
import { fileupload } from "../utils/cloudinary.js";

const teacherAssignmentForm = asyncHandler(async (req, res) => {
  const {
    courseId,
    teacherId,
    teacherName,
    deuDate,
    learningObjective,
    taskInstructions,
    submissionMethod,
    submissionDetails,
    submissionTime,
    isActive,
    assignmentTitle,
  } = req.body;

  console.log("====================================");
  console.log(courseId);
  console.log(teacherId);
  console.log(assignmentTitle);
  console.log("====================================");

  // teacherId" : "688e9c8cb308fc0090aa6516",
  //     "courseId" : "688be99cafc971e757883a14",
  //     "assignmentTitle" : "array structure, explain with examples",
  //     "courseName" : "Na",
  //     "teacherName" : "nischay malhan",
  //     "deuDate" : "25032002",
  //     "learningObjective" : "submission alternative",
  //     "taskInstructions" : "all fileds required",
  //     "submissionMethod" : "online",
  //     "submissionDetails" : "no now details are here",
  //     "submissionTime" : "0350200",
  //     "isActive"

  const course = await Course.findById(courseId);
  console.log(`course ${course}`);

  const courseName = course.title

  const teacher = await Teacher.findById(teacherId).select("-refreshToken -password")
  console.log(`teacher ${teacher}`);

  const courseOwner = course.owner?._id
  console.log(`courseowner ${courseOwner}`);
  
  const teacherOfCourseOwn = teacher?._id
  console.log(`techerOfCourseOwn ${teacherOfCourseOwn}`);

  console.log(`teacherOf owenr ${typeof teacherOfCourseOwn}`);
  console.log(`courseOwner ${typeof courseOwner}`);
  
  if (courseOwner?.toString() === teacherOfCourseOwn?.toString()) {
    console.log(`your the owner of this course now continue the creating the assignment of students`);
  } else {
    throw new ApiError(401,"your not owner this course make sure check the course of you own")
  }
  const assignemntInstructor = teacher.username
  console.log('====================================');
  console.log(assignemntInstructor);
  console.log('====================================');

  const assignmentGiven = {
    courseId,
    teacherId,
    teacherName,
    courseName,
    deuDate,
    learningObjective,
    taskInstructions,
    submissionMethod,
    submissionDetails,
    submissionTime,
    isActive,
    assignmentTitle,
  };

  const teacherAssignement = await TeacherAssignmentForm.create({
    courseId,
    teacherId,
    teacherName : assignemntInstructor,
    deuDate,
    courseName,
    learningObjective,
    taskInstructions,
    submissionMethod,
    submissionDetails,
    submissionTime,
    isActive,
    assignmentTitle,
  });

  return res.status(200).json(new ApiResponse(200, teacherAssignement));
});

const studentAssigmentSubmit = asyncHandler(async (req, res) => {
  const {
    studentId,
    teacherAssignmentFormId,
    additionalComment
  } = req.body

  const assignment = await TeacherAssignmentForm.findById(
    teacherAssignmentFormId
  );
  
  
  const assignmentTypeof = req.files.assignmentType[0].path;

  const assignmentType = await fileupload(assignmentTypeof)
  
    console.log('====================================');
    console.log(assignmentTypeof);
    console.log('====================================');


  const student = await Student.findById(studentId).select("-refreshToken -password")

  const formSubmit = {
    studentId,
    courseId: assignment.courseId,
    teacherAssignmentFormId,
    studnetName: student?.fullName,
    assignmentTitle: assignment?.assignmentTitle,
    assignmentDate: Date.now(),
    additionalComment,
    uploadType: assignmentTypeof.url,
  };

  return res.status(200).json(new ApiResponse(200, formSubmit))

})

export {
  teacherAssignmentForm,
  studentAssigmentSubmit
};
