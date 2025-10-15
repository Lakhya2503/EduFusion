import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from '../models/courses.model.js';
import { Admin } from '../models/admin.model.js';
import { Teacher } from '../models/teacher.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { fileupload } from "../utils/cloudinary.js";
import { Lesson } from "../models/lessons.model.js";


const cleanupIndexes = async () => {
  try {
    const indexes = await Course.collection.getIndexes();
    if (indexes['curriculum.lessons.title_1']) {
      console.log('Removing problematic index: curriculum.lessons.title_1');
      await Course.collection.dropIndex('curriculum.lessons.title_1');
    }
  } catch (error) {
    console.log('Index cleanup completed or not needed');
  }
};


cleanupIndexes();

const createCourses = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    typeOfCourse,
    curriculum: rawCurriculum,
    basePrice,
    offer = 0,
  } = req.body;


  if (!title?.trim() || !description?.trim() || !typeOfCourse || !basePrice) {
    throw new ApiError(400, "All required fields must be provided");
  }


  const existingCourse = await Course.findOne({ 
    title: title.trim().toLowerCase() 
  });
  
  
  if (existingCourse) {
    throw new ApiError(409, `Course with title "${title}" already exists`);
  }

  const teacherId = req.teacher?.id;
  const adminId = req.admin?.id;

  if (!adminId || !teacherId) {
    throw new ApiError(401, "Unauthorized - No admin or teacher found");
  }

  let owner;
  let ownerModel;

  if (adminId) {
    owner = await Admin.findById(adminId).select("-password -refreshToken");
    ownerModel = "Admin";
  } else {
    owner = await Teacher.findById(teacherId).select("-password -refreshToken");
    ownerModel = "Teacher";
  }

  if (!owner) {
    throw new ApiError(404, "Admin or Teacher not found");
  }


  let parsedCurriculum = [];
  if (rawCurriculum) {
    try {
      parsedCurriculum = JSON.parse(rawCurriculum);
      if (!Array.isArray(parsedCurriculum)) {
        throw new Error("Curriculum must be an array");
      }
    } catch (error) {
      throw new ApiError(400, "Invalid curriculum format");
    }
  }


  const lessonIds = [];
  for (const [index, lessonData] of parsedCurriculum.entries()) {
    if (!lessonData.title?.trim() || !lessonData.description?.trim()) {
      throw new ApiError(400, `Lesson ${index + 1} must have title and description`);
    }
    
    const lesson = await Lesson.create({
      title: lessonData.title.trim(),
      description: lessonData.description.trim(),
      pdfLink: lessonData.pdfLink,
      videoLink: lessonData.videoLink,
      order: index + 1
    });
    lessonIds.push(lesson._id);
  }


  if (!req.files?.thumbnail?.[0]) {
    throw new ApiError(400, "Thumbnail file is required");
  }

  const thumbnail = await fileupload(req.files.thumbnail[0].path);
  if (!thumbnail?.url) {
    throw new ApiError(500, "Failed to upload thumbnail");
  }


  const numericBasePrice = parseFloat(basePrice);
  const numericOffer = parseFloat(offer);
  const finalPrice = numericBasePrice - (numericBasePrice * numericOffer / 100);

  
  const course = await Course.create({
    title: title.trim(),
    description: description.trim(),
    typeOfCourse,
    basePrice: numericBasePrice,
    offer: numericOffer,
    finalPrice,
    curriculum: lessonIds,
    owner: owner._id,
    ownerModel,
    thumbnail: thumbnail.url,
  });

  const populatedCourse = await Course.findById(course._id)
    .populate('curriculum')
    .populate('owner');

  return res
    .status(201)
    .json(
      new ApiResponse(201, { course: populatedCourse }, "Course created successfully")
    );
});

const getCourses = asyncHandler(async (_, res) => {
  const courses = await Course.find({ isActive: true })
    .populate('curriculum')
    .populate('owner')
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

const updateCurriculum = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { curriculum: rawCurriculum } = req.body;

  if (!courseId) {
    throw new ApiError(400, "Course ID is required");
  }

  const existingCourse = await Course.findById(courseId);
  if (!existingCourse) {
    throw new ApiError(404, "Course not found");
  }

  let newLessons = [];
  if (rawCurriculum) {
    try {
      newLessons = JSON.parse(rawCurriculum);
      if (!Array.isArray(newLessons)) {
        throw new Error("Curriculum must be an array");
      }
    } catch (error) {
      throw new ApiError(400, "Invalid curriculum format");
    }
  }

  const newLessonIds = [];
  const startOrder = existingCourse.curriculum.length;
  
  for (const [index, lessonData] of newLessons.entries()) {
    if (!lessonData.title?.trim() || !lessonData.description?.trim()) {
      throw new ApiError(400, `Lesson ${index + 1} must have title and description`);
    }
    
    const lesson = await Lesson.create({
      title: lessonData.title.trim(),
      description: lessonData.description.trim(),
      pdfLink: lessonData.pdfLink,
      videoLink: lessonData.videoLink,
      order: startOrder + index + 1
    });
    newLessonIds.push(lesson._id);
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { $push: { curriculum: { $each: newLessonIds } } },
    { new: true }
  ).populate('curriculum').populate('owner');

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCourse, "Curriculum updated successfully"));
});

export { createCourses, updateCurriculum, getCourses };
