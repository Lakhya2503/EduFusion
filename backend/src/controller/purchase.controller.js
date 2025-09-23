import { Purchase } from "../models/coursePurchase.model.js";
import { Course } from "../models/courses.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const purchaseCourse = asyncHandler(async (req,res) => {
    const { courseId } = req.body

    console.log(`courseId : ${courseId}`);

    let coursePrice = await Course.findById(courseId)

    const { basePrice, finalPrice, offer } = coursePrice;

    console.log(
      `  basePrice ${basePrice}, finalPrice  ${finalPrice} , offer ${offer} `
    );
    
    
    const studentId = req.student?.id
    
    console.log(`studentId : ${studentId}`);

    if (!courseId ) {
        throw new ApiError(401,"courseId and payment are required")
    }

    // if (payment <= 0) {
    //     throw new ApiError(401, "PAYMENT REQUIRED FOR PURCHASE COURSE ");
    // }

    const userAlreadyPaid = await Purchase.findById(courseId)
    

    if (userAlreadyPaid) {
        throw new ApiError(400, "ALREADY PAID FOR THIS COURSE")
    }


    const purchase = await Purchase.create({
        buyer: studentId,
        amount: Number(finalPrice),
        course : courseId
    })

    console.log(`purchase : ${purchase}`);
    

    let course;
    let student;

   try {
     if (purchase) {
          course = await Course.findByIdAndUpdate(courseId, {
             $push: {
                purches : purchase
            }
          }, {
            new : true
          })
         
         student = await Student.findByIdAndUpdate(studentId, {
             $push: {
                 purchesedCourse : purchase
             }
         }, {
             new : true
         })
         
     }
   } catch (error) {
    throw new ApiError(400, error?.message || "purchase the course first");
    }
    
    console.log(`course :${course}`);
    console.log(`student :${student}`);
    

    return res
      .status(200)
        .json(new ApiResponse(200, {course, student}, "course purchase successfully"));
})


export {
    purchaseCourse
}