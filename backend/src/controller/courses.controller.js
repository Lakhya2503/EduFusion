import { asyncHandler } from "../utils/asyncHandler.js";
import { Courses } from '../models/courses.model.js'
import { ApiResponse } from "../utils/ApiResponse.js";


const createCourses = asyncHandler(async (req, res) => {

    const { title, desc, curriculems, owner, thumbnail, buyer, creater } = req.body 

    const courses = {
        title,
        desc,
        curriculems,
        owner,
        thumbnail,
        buyer,
        creater
    }

    




    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { courses: courses },
          "course created successfully"
        )
      );
})


export {
    createCourses 
};