import { asyncHandler } from "../utils/asyncHandler.js";
import { Courses } from '../models/courses.model.js'
import { Admin } from '../models/admin.model.js'
import { Teacher } from '../models/teacher.model.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { fileupload } from "../utils/cloudinary.js";


const createCourses = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    curriculum: rawCurriculum,
    basePrice,
    offer,
    finalPrice,
  } = req.body;

  console.log(
    `title: ${title}, description: ${description}, curriculum: ${rawCurriculum}, basePrice: ${basePrice}, offer: ${offer}, finalPrice: ${finalPrice}`
  );

  if ([title, description].some((items) => items.trim() === "")) {
    throw new ApiError(400, `${items} , filed required`);
  }
  const adminID = req.admin?.id;
  const teacherID = req.teacher?.id;

  let createdBy;

  if (adminID) {
    createdBy = await Admin.findById(adminID).select("-password -refreshToken");
  } else if (teacherID) {
    createdBy = await Teacher.findById(teacherID).select(
      "-password -refreshToken"
    );
  } else {
    throw new ApiError(401, "Unauthorized - No admin or teacher found");
  }

  console.log(`createdBy : ${createdBy}`);

  // Parse and validate curriculum
  let parsedCurriculum;
  try {
    parsedCurriculum = JSON.parse(rawCurriculum); 
    if (!parsedCurriculum) {
      throw new ApiError(400,"data not parse")
    }
    if (!Array.isArray(parsedCurriculum)) {
      throw new ApiError(401,"Curriculum must be an array");
    }
  } catch (error) {
    throw new ApiError(400, "Invalid curriculum format: " + error.message); 
  }

  // Validate each lesson
  for (const lesson of parsedCurriculum) {
    if (!lesson.title || !lesson.description) {
      throw new ApiError(400, "Each lesson must have a title and description");
    }
  }

  if (!createdBy) {
    throw new ApiError(401, " Admin or teacher not found");
  }

  const localFilePath = await req.files.thumbnail[0].path;

  if (!localFilePath) {
    throw new ApiError(401, " localFilePath not available");
  }

  const thumbnail = await fileupload(localFilePath);

  if (!thumbnail) {
    throw new ApiError(401, "thumbnail not available");
  }

  const course = await Courses.create({
    title,
    description,
    basePrice: Number(basePrice),
    curriculum: parsedCurriculum,
    owner: createdBy,
    purches: [],
    thumbnail: thumbnail.url,
    offer: Number(offer),
    finalPrice: Number(finalPrice),
    rating: [],
  });

  if (!course) {
    throw new ApiError(401, "COURSE NOT CREATED");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { course }, "course created successfully"));
})

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Courses.find();

  if (!courses) {
    new ApiError(400, "Coureses not fetch");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "course fetch Successfully"));
});

const updateCurriculum = asyncHandler(async (req, res) => {
  console.log(`req.body : ${req.body}`);
  
  
  
  
  const { curriculum : rowCurriculum, courseId } = req.body;
  
  const coureseGet = await Courses.findById(courseId);
  console.log(`coureseGet: ${coureseGet}`);

  console.log(`curriculum : ${rowCurriculum}`);
  
  const course = await Courses.findByIdAndUpdate(
    courseId,
    {
      $push: {
        curriculum: rowCurriculum,
      },
    },
    {
      new: true,  
    }
  );

  if (!course) {
    throw new ApiError(404, "COURSE NOT UPDATED")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "course updated successfully"))
})


export { createCourses, updateCurriculum, getCourses };
