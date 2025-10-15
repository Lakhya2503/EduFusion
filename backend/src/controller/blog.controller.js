import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from '../models/admin.model.js'
import { Teacher } from '../models/teacher.model.js'
import { Student } from '../models/student.model.js'
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { fileupload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBlog = asyncHandler(async (req, res) => {
    const { contentType, blogHeading, blogPara, isActive } = req.body;


    if (
      !contentType?.trim() ||
      !blogHeading?.trim() ||
      !blogPara?.trim() 
    ) {
      throw new ApiError(400, "All required fields must be required");
    }

    // const adminId = req?.admin._id
    // const teacherId = req?.teacher._id
     const studentId = req?.student?.id
    
  console.log('====================================');
  // console.log(`adminId: ${adminId}`);
  // console.log(`teacherId: ${teacherId}`);
  console.log(`studentId: ${studentId}`);
  console.log('====================================');

    
  let userId;
  
 if (studentId) {
       userId = await Student.findById(studentId).select("-refreshToken -password")
  } else {
        throw new ApiError(401 , "Didn't match any id")
  }

  // {

  //   if (adminId) {
  //     userId = await Admin.findById(adminId).select("-refreshToken -password")
  //   } else if (teacherId) {
  //      userId = await Teacher.findById(teacherId).select("-refreshToken -password")
  //  } else

  // }

  console.log(req?.files);

  const thumbnail = req?.files.thumbnail[0].path;
  if (!thumbnail) {
    throw new ApiError(404, "Thumnail is required")
  }

  const thumbnailOfBlog = await fileupload(thumbnail); 


  const blog = await Blog.create({
    contentType: contentType,
    blogHeading: blogHeading,
    blogThumbnail: thumbnailOfBlog.url,
    blogPara: blogPara,
    blogOwner: userId,
    isActive: isActive,
  });


  return res
    .status(200)
     .json(new ApiResponse(200, blog, "blogCreate successfully"))
})

const getBlog = asyncHandler(async (req, res) => {

  const blog = await Blog.find({ isActive: true })

  return res.status(200).json(new ApiResponse(200,blog))
}) 

export {
  createBlog,
  getBlog
}