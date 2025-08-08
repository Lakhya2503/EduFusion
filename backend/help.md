

    ## admin

    http://localhost:5000/edufusion/api/v2/users/admin/register

    http://localhost:5000/edufusion/api/v2/users/admin/login

    http://localhost:5000/edufusion/api/v2/users/admin/:id 

    http://localhost:5000/edufusion/api/v2/users/admin/logout

    http://localhost:5000/edufusion/api/v2/users/admin/refresh-token

    http://localhost:5000/edufusion/api/v2/users/admin/change-password


    ## teacher

    http://localhost:5000/edufusion/api/v2/users/teacher/register

    http://localhost:5000/edufusion/api/v2/users/teacher/login

    http://localhost:5000/edufusion/api/v2/users/teacher/:id 

    http://localhost:5000/edufusion/api/v2/users/teacher/logout

    http://localhost:5000/edufusion/api/v2/users/teacher/refresh-token

    http://localhost:5000/edufusion/api/v2/users/teacher/change-password



    ## student


    http://localhost:5000/edufusion/api/v2/users/student/register

    http://localhost:5000/edufusion/api/v2/users/teastudentcher/login

    http://localhost:5000/edufusion/api/v2/users/student/:id 

    http://localhost:5000/edufusion/api/v2/users/student/logout

    http://localhost:5000/edufusion/api/v2/users/student/refresh-token

    http://localhost:5000/edufusion/api/v2/users/student/change-password






    import { asyncHandler } from "../utils/asyncHandler.js"
    import { ApiResponse } from '../utils/ApiResponse.js'
    import { ApiError } from "../utils/ApiError.js"
    import { Admin } from '../models/admin.model.js'
    import { fileupload } from '../utils/cloudinary.js'
    import jwt from "jsonwebtoken";


    const options = {
        httpOnly: true,
        secure : true
    }

    const genrateAccesstokenAndRefreshToken = async (adminId)=> {
        const admin = await Admin.findById(adminId);

        const accessToken = await admin.genrateAccessToken()
        const refreshToken = await admin.genrateRefreshToken()

        admin.accessToken = accessToken
        admin.refreshToken = refreshToken

        admin.save({
            validateBeforeSave : false
        })

        return {
            accessToken,
            refreshToken
        }

    }

    const registerAdmin = asyncHandler(async (req, res) => {

        const { username, fullName, email, password, role } = req.body

        if (
            [username, fullName, email, password, role].forEach((fields) => fields.trim() === "")
        ) {
            throw new ApiError(404, "all fields are required")
        }


        const adminAlreadyExits = await Admin.exists({
            username, email
        })

        if (adminAlreadyExits) {
            throw new ApiError(422, "Admin already exists")
        }

        const localFilePath = req.files.avatar[0].path
        
        console.log(`localFilePath : ${localFilePath} `);

        if (!localFilePath) {
            throw new ApiError(404, "localFilePath not found")
        }

        const avatar = await fileupload(localFilePath);
        console.log(`avatar : ${avatar}`);
        

        if (!avatar) {
            throw new ApiError(404, "Avatar not found")
        }
        

        const admin = await Admin.create({
            username: username,
            fullName: fullName,
            password : password,
            email: email,
            role: role,
            avatar : avatar.url
        })

        const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken")
        
        if (!createdAdmin) {
            throw new ApiError(404, "User not Created")
        }

        res.status(200).json(new ApiResponse(200, {"user": createdAdmin},"ok"))
    });

    const logginAdmin = asyncHandler(async (req, res) => {
        const { username, email, password } = req.body
        console.log(`username : ${username}, email : ${email}, password : ${password}`);
        
        if (!(username || email)) {
            throw new ApiError(404, "email or username are required")
        }

        
        const admin = await Admin.findOne({
            $or : [ { username }, { email }]
        })

        if (!password) {
            throw new ApiError(404, "password must be included")
        }
        
        const isPassowrdCorrect = await admin.isPasswordValid(password);

        console.log(`isPassowrdCorrect : ${isPassowrdCorrect}`);

        if (!isPassowrdCorrect) {
          throw new ApiError(404, "Please check the password once");
        }

        const loggedInAdmin = await Admin.findById(admin._id).select(
          "-password -refreshToken"
        );

        if (!loggedInAdmin) {
          throw new ApiError(404, "loggedI");
        }

      const { refreshToken, accessToken } = await genrateAccesstokenAndRefreshToken(admin._id)


        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(
            new ApiResponse(
              200,
              { loggedAdmin: loggedInAdmin, refreshToken, accessToken },
              "user loggedIn successFully"
            )
          )
          
    })

    const loggedOutAdmin = asyncHandler(async (req,res) => {
        await Admin.findByIdAndUpdate(req.admin._id, {
          $unset: {
            refreshToken: 1,
          },
        },
            {
                new : true
            }
        );

        return res
          .status(200)
          .json(new ApiResponse(200, {}, "admin loggedOut successFully"));
    })

    const adminRefeshAccessToken = asyncHandler(async (req,res) => {
        const incomingRefreshToken = req.cookies.refreshToken

        console.log(`incomming refresh Token : ${incomingRefreshToken}`);

        if (!incomingRefreshToken) {
            throw new ApiError(401, "refresh token not found")      
        }
        

        try {
            const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
            
            if (!decodedToken) {
                throw new ApiError(401, "token invalid")
            }
        
            const admin = await Admin.findById(decodedToken?._id)

            if (!admin) {
                throw new ApiError(404, "admin not found")  
            }
            
            if (incomingRefreshToken !== admin?.refreshToken) {
                throw new ApiError(400, "token used or exipred");
            }
            
            const { refreshToken, accessToken } = await genrateAccesstokenAndRefreshToken(admin._id);
        
            return res
              .status(200)
              .cookie("refreshToken", refreshToken, options)
              .cookie("accessToken", accessToken, options)
              .json(new ApiResponse(200, { accessToken, refreshToken }));
        
        } catch (error) {
            throw new ApiError(401, error?.message || "token invalid or expired")
        }
    })

    const getAdmin = asyncHandler(async (req, res) => {
        console.log(req.params?.id);
        
        const admin = await Admin.findById(req.params?.id).select("-password -refreshToken")

        if (!admin) {
            throw new ApiError(404, "User not found")
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { admin: admin }, "User fetch successfully"))
    })

    const adminPasswordUpdate = asyncHandler(async (req, res) => {
        const { oldPassword, newPassword } = req.body

        const admin = await Admin.findById(req.admin._id)

        console.log(`admin :${admin}`);

        if (!admin) {
            throw new ApiError(404, "admin not found")
        }

        const validPassword = admin.isPasswordValid(oldPassword)

        if (!validPassword) {
            throw new ApiError(401, "check your old password")
        }

        admin.password = newPassword
        await admin.save({ validateBeforeSave: false })
        


        return res
            .status(200)
            .json(new ApiResponse(200, { }, "password change successfully"))

    })



    export {
      registerAdmin,
      logginAdmin,
      loggedOutAdmin,
      adminRefeshAccessToken,
      adminPasswordUpdate,
      getAdmin,
    };



      import { asyncHandler } from "../utils/asyncHandler.js";
      import { ApiResponse } from "../utils/ApiResponse.js";
      import { ApiError } from "../utils/ApiError.js";
      import { Teacher } from "../models/teacher.model.js";
      import { fileupload } from "../utils/cloudinary.js";
      import jwt from "jsonwebtoken";

      const options = {
        httpOnly: true,
        secure: true,
      };

      const genrateAccesstokenAndRefreshToken = async (teacherId) => {
        const teacher = await Teacher.findById(teacherId);

        const accessToken = await teacher.genrateAccessToken();
        const refreshToken = await teacher.genrateRefreshToken();

        teacher.accessToken = accessToken;
        teacher.refreshToken = refreshToken;

        teacher.save({
          validateBeforeSave: false,
        });

        return {
          accessToken,
          refreshToken,
        };
      };

      const registerTeacher = asyncHandler(async (req, res) => {
        const {
          username,
          fullName,
          email,
          password,
          role,
          contact,
          dateOfBirth,
          gender,
          addressLine1,
          addressLine2,
          pincode,
          yearsOfExperince,
          subjectsTaught,
          professionalBiography,
        } = req.body;

        if (
          [
            username,
            fullName,
            email,
            password,
            role,
            contact,
            dateOfBirth,
            gender,
            addressLine1,
            addressLine2,
            pincode,
            yearsOfExperince,
            subjectsTaught,
            professionalBiography,
          ].forEach((fields) => fields.trim() === "")
        ) {
          throw new ApiError(404, "all fields are required");
        }

        const teacherAlreadyExits = await Teacher.exists({
          username,
          email,
        });

        if (teacherAlreadyExits) {
          throw new ApiError(422, "Teacher already exists");
        }

          const localFilePath = req.files.avatar[0].path;
          console.log(localFilePath);

        console.log(`localFilePath : ${localFilePath} `);

        if (!localFilePath) {
          throw new ApiError(404, "localFilePath not found");
        }

        const avatar = await fileupload(localFilePath);
        console.log(`avatar : ${avatar}`);

        if (!avatar) {
          throw new ApiError(404, "Avatar not found");
        }

        const teacher = await Teacher.create({
          username: username,
          fullName: fullName,
          password: password,
          email: email,
          role: role,
          avatar: avatar.url,
          contact,
          dateOfBirth,
          gender,
          addressLine1,
          addressLine2,
          pincode,
          yearsOfExperince,
          subjectsTaught,
          professionalBiography,
        });

        const createTeacher = await Teacher.findById(teacher._id).select(
          "-password -refreshToken"
        );

        if (!createTeacher) {
          throw new ApiError(404, "User not Created");
        }

        res.status(200).json(new ApiResponse(200, { user: createTeacher }, "Teacher created Successfully"));
      });

      const loggedInTeacher = asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        console.log(
          `username : ${username}, email : ${email}, password : ${password}`
        );

        if (!(username || email)) {
          throw new ApiError(404, "email or username are required");
        }

        const teacher = await Teacher.findOne({
          $or: [{ username }, { email }],
        });

        if (!password) {
          throw new ApiError(404, "password must be included");
        }

        const isPassowrdCorrect = await teacher.isPasswordValid(password);

        console.log(`isPassowrdCorrect : ${isPassowrdCorrect}`);

        if (!isPassowrdCorrect) {
          throw new ApiError(404, "Please check the password once");
        }

        const loginTeacher = await Teacher.findById(teacher._id).select(
          "-password -refreshToken"
        );

        if (!loginTeacher) {
          throw new ApiError(404, "loggedI");
        }

        const { refreshToken, accessToken } = await genrateAccesstokenAndRefreshToken(
          teacher._id
        );

        return res
          .status(200)
          .cookie("refreshToken", refreshToken, options)
          .cookie("accessToken", accessToken, options)
          .json(
            new ApiResponse(
              200,
              { loginTeacher: loginTeacher, refreshToken, accessToken },
              "Teacher loggedIn successFully"
            )
          );
      });

      const loggedOutTeacher = asyncHandler(async (req, res) => {
        await Teacher.findByIdAndUpdate(
          req.teacher._id,
          {
            $unset: {
              refreshToken: 1,
            },
          },
          {
            new: true,
          }
        );

        return res
          .status(200)
          .json(new ApiResponse(200, {}, "teacher loggedOut successFully"));
      });

      const teacherRefeshAccessToken = asyncHandler(async (req, res) => {
        const incomingRefreshToken = req.cookies?.refreshToken;

        console.log(`incomming refresh Token : ${incomingRefreshToken}`);

        const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        if (!decodedToken) {
          throw new ApiError(401, "token invalid");
        }

        const teacher = await Teacher.findById(decodedToken._id);

        if (incomingRefreshToken !== teacher?.refreshToken) {
          throw new ApiError(400, "token used or exipred");
        }

        const { refreshToken, accessToken } =
          await genrateAccesstokenAndRefreshToken(teacher._id);

        return res
          .status(200)
          .cookie(refreshToken, options)
          .cookie(accessToken, options)
          .json(new ApiResponse(200, { accessToken, refreshToken }));
      });

      const getTeacher = asyncHandler(async (req, res) => {
        console.log(req.params?.id);

        const teacher = await Teacher.findById(req.params?.id).select(
          "-password -refreshToken"
        );

        if (!teacher) {
          throw new ApiError(404, "User not found");
        }

        return res
          .status(200)
          .json(new ApiResponse(200, { teacher: teacher }, "teacher fetch successfully"));
      });

      const teacherPasswordUpdate = asyncHandler(async (req, res) => {
        const { oldPassword, newPassword } = req.body;

        const teacher = await Teacher.findById(req.teacher._id);

        console.log(`teacher :${teacher}`);

        if (!teacher) {
          throw new ApiError(404, "teacher not found");
        }

        const validPassword = teacher.isPasswordValid(oldPassword);

        if (!validPassword) {
          throw new ApiError(401, "check your old password");
        }

        teacher.password = newPassword;
        await teacher.save({ validateBeforeSave: false });

        return res
          .status(200)
          .json(new ApiResponse(200, {}, "password change successfully"));
      });

      export {
        registerTeacher,
        loggedInTeacher,
        loggedOutTeacher,
        teacherRefeshAccessToken,
        teacherPasswordUpdate,
        getTeacher,
      };


    import { asyncHandler } from "../utils/asyncHandler.js";
    import { ApiResponse } from "../utils/ApiResponse.js";
    import { ApiError } from "../utils/ApiError.js";
    import { Student } from "../models/student.model.js";
    import { fileupload } from "../utils/cloudinary.js";
    import jwt from "jsonwebtoken";

    const options = {
      httpOnly: true,
      secure: true,
    };

    const genrateAccesstokenAndRefreshToken = async (studentId) => {
      const student = await Student.findById(studentId);

      const accessToken = await student.genrateAccessToken();
      const refreshToken = await student.genrateRefreshToken();

      student.accessToken = accessToken;
      student.refreshToken = refreshToken;

      student.save({
        validateBeforeSave: false,
      });

      return {
        accessToken,
        refreshToken,
      };
    };

    const registerStudent = asyncHandler(async (req, res) => {
      const {
        username,
        fullName,
        email,
        password,
        role,
        contact,
        dateOfBirth,
        gender,
        addressLine1,
        addressLine2,
        pincode,
        shortBio,
      } = req.body;

      if (
        [
          username,
          fullName,
          email,
          password,
          role,
          contact,
          dateOfBirth,
          gender,
          addressLine1,
          addressLine2,
          pincode,
          shortBio,
        ].forEach((fields) => fields.trim() === "")
      ) {
        throw new ApiError(404, "all fields are required");
      }

      const studentAlreadyExits = await Student.exists({
        username,
        email,
      });

      if (studentAlreadyExits) {
        throw new ApiError(422, "STUDENT already exists");
      }

      const localFilePath = req.files.avatar[0].path;
      console.log(localFilePath);

      console.log(`localFilePath : ${localFilePath} `);

      if (!localFilePath) {
        throw new ApiError(404, "localFilePath not found");
      }

      const avatar = await fileupload(localFilePath);
      console.log(`avatar : ${avatar}`);

      if (!avatar) {
        throw new ApiError(404, "Avatar not found");
      }

      const student = await Student.create({
        username: username,
        fullName: fullName,
        password: password,
        email: email,
        role: role,
        avatar: avatar.url,
        contact,
        purchesedCourse : [],
        dateOfBirth,
        gender,
        addressLine1,
        addressLine2,
        pincode,
        shortBio,
      });

      const createdStudent = await Student.findById(student._id).select(
        "-password -refreshToken"
      );

      if (!createdStudent) {
        throw new ApiError(404, "User not Created");
      }

      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { user: createdStudent },
            "STUDENT created Successfully"
          )
        );
    });

    const loggedInStudent = asyncHandler(async (req, res) => {
      const { username, email, password } = req.body;
      console.log(
        `username : ${username}, email : ${email}, password : ${password}`
      );

      if (!(username || email)) {
        throw new ApiError(404, "email or username are required");
      }

      const student = await Student.findOne({
        $or: [{ username }, { email }],
      });

      if (!password) {
        throw new ApiError(404, "password must be included");
      }

      const isPassowrdCorrect = await student.isPasswordValid(password);

      console.log(`isPassowrdCorrect : ${isPassowrdCorrect}`);

      if (!isPassowrdCorrect) {
        throw new ApiError(404, "Please check the password once");
      }

      const loginStudent = await Student.findById(student._id).select(
        "-password -refreshToken"
      );

      if (!loginStudent) {
        throw new ApiError(404, "loggedI");
      }

      const { refreshToken, accessToken } = await genrateAccesstokenAndRefreshToken(
        student._id
      );

      return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
          new ApiResponse(
            200,
            { loginStudent: loginStudent, refreshToken, accessToken },
            "STUDENT loggedIn successFully"
          )
        );
    });

    const loggedOutStudent = asyncHandler(async (req, res) => {
      await Student.findByIdAndUpdate(
        req.student._id,
        {
          $unset: {
            refreshToken: 1,
          },
        },
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json(new ApiResponse(200, {}, "STUDENT loggedOut successFully"));
    });

    const studentRefeshAccessToken = asyncHandler(async (req, res) => {
      const incomingRefreshToken = req.cookies?.refreshToken;

      console.log(`incomming refresh Token : ${incomingRefreshToken}`);

      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      if (!decodedToken) {
        throw new ApiError(401, "token invalid");
      }

      const student = await Student.findById(decodedToken._id);

      if (incomingRefreshToken !== student?.refreshToken) {
        throw new ApiError(400, "token used or exipred");
      }

      const { refreshToken, accessToken } = await genrateAccesstokenAndRefreshToken(
        student._id
      );

      return res
        .status(200)
        .cookie(refreshToken, options)
        .cookie(accessToken, options)
        .json(new ApiResponse(200, { accessToken, refreshToken }));
    });

    const getStudent = asyncHandler(async (req, res) => {
      console.log(req.params?.id);

      const student = await Student.findById(req.params?.id).select(
        "-password -refreshToken"
      );

      if (!student) {
        throw new ApiError(404, "User not found");
      }

      return res
        .status(200)
        .json(
          new ApiResponse(200, { student: student }, "STUDENT fetch successfully")
        );
    });

    const studentPasswordUpdate = asyncHandler(async (req, res) => {
      const { oldPassword, newPassword } = req.body;

      const student = await Student.findById(req.student._id);

      console.log(`student :${student}`);

      if (!student) {
        throw new ApiError(404, "Student not found");
      }

      const validPassword = student.isPasswordValid(oldPassword);

      if (!validPassword) {
        throw new ApiError(401, "check your old password");
      }

      student.password = newPassword;
      await student.save({ validateBeforeSave: false });

      return res
        .status(200)
        .json(new ApiResponse(200, {}, "password change successfully"));
    });

    export {
      registerStudent,
      loggedInStudent,
      loggedOutStudent,
      studentPasswordUpdate,
      studentRefeshAccessToken,
      getStudent,
    };


    import { Purchase } from "../models/coursePurchase.model.js";
    import { Courses } from "../models/courses.model.js";
    import { Student } from "../models/student.model.js";
    import { ApiError } from "../utils/ApiError.js";
    import { ApiResponse } from "../utils/ApiResponse.js";
    import { asyncHandler } from "../utils/asyncHandler.js";


    const purchaseCourse = asyncHandler(async (req,res) => {
        const { courseId } = req.body

        console.log(`courseId : ${courseId}`);

        let coursePrice = await Courses.findById(courseId)

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
              course = await Courses.findByIdAndUpdate(courseId, {
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


    export {
      createCourses,
      updateCurriculum
    };



    import mongoose from 'mongoose'

    export const connectDB = async function () {
        try {
            const promise = await mongoose.connect(
              `${process.env.MONGODB_URI}/${process.env.APP_NAME}`
            );
            console.log(`Database connected: ${process.env.MONGODB_URI}/${process.env.APP_NAME}`);
            return promise
        } catch (error) {
            console.log("Database connection error:", error);
            process.exit(1)
        }
    }


    import jwt from 'jsonwebtoken'
    import { ApiError } from '../utils/ApiError.js'
    import { Admin } from '../models/admin.model.js'

    const verifyAdminJWT = async (req, _, next) => {
        try {
          const incommingToken = req.cookies?.accessToken;

          if (!incommingToken) {
            throw new ApiError(404, "incomming token not found");
          }

          console.log(`incommingToken : ${incommingToken}`);

          const token = jwt.verify(
            incommingToken,
            process.env.ACCESS_TOKEN_SECRET
          );

          console.log(`token : ${token}`);

          console.log(
            `process.env.ACCESS_TOKEN_SECRET : ${process.env.ACCESS_TOKEN_SECRET}`
          );

          if (!token) {
            throw new ApiError(404, "Token not found");
          }

          console.log(`token?._id :${token?._id}`);

          if (!token?._id) {
            throw new ApiError(404, "Token not _id found");
          }

          const admin = await Admin.findById(token?._id).select(
            "-password -refreshToken"
          );

          if (!admin) {
            throw new ApiError(404, "please check the token");
          }

          req.admin = admin;

          next();
        } catch (error) {
          throw new ApiError(
            404,
            error.message || "please check the token on veryfing"
          );
        }
    }


    export {
        verifyAdminJWT
    };


    import multer from "multer";

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/temp"); // file store on "/public/temp " folder
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname); // i wan't a original file name
        console.log(`File uploaded: ${file.originalname}`);
      },
    });

    export const upload = multer({ storage: storage });

    import jwt from 'jsonwebtoken'
    import { ApiError } from '../utils/ApiError.js'
    import { Student } from '../models/student.model.js';

    const verifyStudentJWT = async (req, _, next) => {
      try {
        const incommingToken = req.cookies?.accessToken;

        if (!incommingToken) {
          throw new ApiError(404, "incomming token not found");
        }

        console.log(`incommingToken : ${incommingToken}`);

        const token = jwt.verify(incommingToken, process.env.ACCESS_TOKEN_SECRET);

        console.log(`token : ${token}`);

        console.log(
          `process.env.ACCESS_TOKEN_SECRET : ${process.env.ACCESS_TOKEN_SECRET}`
        );

        if (!token) {
          throw new ApiError(404, "Token not found");
        }

        console.log(`token?._id :${token?._id}`);

        if (!token?._id) {
          throw new ApiError(404, "Token not _id found");
        }

        const student = await Student.findById(token?._id).select(
          "-password -refreshToken"
        );

        if (!student) {
          throw new ApiError(404, "please check the token");
        }

        req.student = student;

        next();
      } catch (error) {
        throw new ApiError(
          404,
          error.message || "please check the token on veryfing"
        );
      }
    };


    export {
      verifyStudentJWT
    };



    import jwt from 'jsonwebtoken'
    import { ApiError } from '../utils/ApiError.js'
    import { Teacher } from '../models/teacher.model.js'

    const verifyTeacherJWT = async (req, _, next) => {
        try {
          const incommingToken = req.cookies?.accessToken;

          if (!incommingToken) {
            throw new ApiError(404, "incomming token not found");
          }

          console.log(`incommingToken : ${incommingToken}`);

          const token = jwt.verify(
            incommingToken,
            process.env.ACCESS_TOKEN_SECRET
          );

          console.log(`token : ${token}`);

          console.log(
            `process.env.ACCESS_TOKEN_SECRET : ${process.env.ACCESS_TOKEN_SECRET}`
          );

          if (!token) {
            throw new ApiError(404, "Token not found");
          }

          console.log(`token?._id :${token?._id}`);

          if (!token?._id) {
            throw new ApiError(404, "Token not _id found");
          }

          const teacher = await Teacher.findById(token?._id).select(
            "-password -refreshToken"
          );

          if (!teacher) {
            throw new ApiError(404, "please check the token");
          }

          req.teacher = teacher;

          next();
        } catch (error) {
          throw new ApiError(
            404,
            error.message || "please check the token on veryfing"
          );
        }
    }


    export {
        verifyTeacherJWT
    };



    import { model, Schema } from 'mongoose'
    import { compare, hash } from 'bcrypt'
    import jwt from 'jsonwebtoken'

    const adminSchema = new Schema(
      {
        username: {
          type: String,
          required: true,
          lowercase: true,
          trim: true,
        },
        fullName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          lowercase: true,
          unique: true,
          match: [/.+\@.+\..+/, "Please fill a valid email address"],
        },
        password: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
          default:
            "https://i.pinimg.com/1200x/e5/14/94/e51494da5d8263f1c9021f4c3b2d4555.jpg",
        },
        role: {
          type: String,
        },
        refreshToken: {
          type: String,
        },
      },
      { timestamps: true }
    );


    adminSchema.pre("save", async function (next) {
        if(!this.isModified('password')) return next()
        this.password = await hash(this.password, 10)
        next()
    })

    adminSchema.methods.isPasswordValid = async function (password) {
        return await compare(password,this.password)
    }

    adminSchema.methods.genrateAccessToken = async function () {
        return  jwt.sign(
          {
            _id: this._id,
            email: this.email,
            password: this.fullName,
            fullName: this.fullName,
            role: this.role,
          },
            process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          }
        );
    }

    adminSchema.methods.genrateRefreshToken = async function () {
        return jwt.sign(
          {
            _id: this._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
          }
        );
    }




    export const Admin = model("Admin", adminSchema)


    import { model, Schema } from 'mongoose'

    const purchaseSchema = new Schema(
      {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            requied : true
        },
        amount: {
            type: Number,
            required : true
        },
      },
      { timestamps: true }
    );
        
    export const Purchase = model("Purchase", purchaseSchema);



    import { model, Schema } from "mongoose";
    import { compare, hash } from "bcrypt";
    import jwt from "jsonwebtoken";

    const studentSchema = new Schema(
      {
        username: {
          type: String,
          required: true,
          lowercase: true,
          trim: true,
        },
        fullName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          lowercase: true,
          unique: true,
          match: [/.+\@.+\..+/, "Please fill a valid email address"],
        },
        password: {
          type: String,
          required: true,
        },
        contact: {
          type: String,
          required: true,
        },
        dateOfBirth: {
          type: Date,
        },
        gender: {
          type: String,
          required: true,
          enum: ["male", "female", "other"],
          default: "",
        },
        role: {
          type: String,
          default: "Student",
        },
        addressLine1: {
          type: String,
          required: true,
        },
        addressLine2: {
          type: String,
        },
        city: {
          type: String,
        },
        pincode: {
          type: String,
          required: true,
        },
        purchesedCourse: [
          {
            type: Schema.Types.ObjectId,
            ref: "Purchase",
          },
        ],
        avatar: {
          type: String,
          required: true,
          default:
            "https://i.pinimg.com/1200x/e5/14/94/e51494da5d8263f1c9021f4c3b2d4555.jpg",
        },
        shortBio: {
          type: String,
        },
        refreshToken: {
          type: String,
        },
      },
      { timestamps: true }
    );

    studentSchema.pre("save", async function (next) {
      if (!this.isModified("password")) return next();
      this.password = await hash(this.password, 10);
      next();
    });

    studentSchema.methods.isPasswordValid = async function (password) {
      return await compare(password, this.password);
    };

    studentSchema.methods.genrateAccessToken = async function () {
      return jwt.sign(
        {
          _id: this._id,
          username: this.username,
          fullName: this.fullName,
          email: this.email,
          password: this.password,
          role: this.role,
          contact: this.contact,
          dateOfBirth: this.dateOfBirth,
          gender: this.gender,
          addressLine1: this.addressLine1,
          addressLine2: this.addressLine2,
          pincode: this.pincode,
          shortBio: this.shortBio,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );
    };

    studentSchema.methods.genrateRefreshToken = async function () {
      return jwt.sign(
        {
          _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
      );
    };

    export const Student = model("Student", studentSchema);


    import { model, Schema } from "mongoose";
    import { compare, hash } from "bcrypt";
    import jwt from "jsonwebtoken";

    const teacherSchema = new Schema(
        {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address']
        },
        contact : {
            type: String,
        },
        dateOfBirth: {
            type : Date
        },
        gender: {
            type: String,
            enum : ["male", "female","other"]
        },
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
        },
        pincode: {
            type : String
        },
        yearsOfExperince: {
            type : String,    
            required: true,
        },
        subjectsTaught: {
            type: String,
            enum : ["JS","JAVA","PYTHON","DSA","C++","C#","C","RUBY","WEB DEV"],
        },
        professionalBiography :{
            type : String,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required : true,
            default:
                "https://i.pinimg.com/1200x/e5/14/94/e51494da5d8263f1c9021f4c3b2d4555.jpg",
        },
        role: {
            type: String,
            default : "teacher"
        },
        refreshToken: {
            type: String,
            },
        },
      { timestamps: true }
    );

    teacherSchema.pre("save", async function (next) {
      if (!this.isModified("password")) return next();
      this.password = await hash(this.password, 10);
      next();
    });

    teacherSchema.methods.isPasswordValid = async function (password) {
      return await compare(password,this.password);
    };

    teacherSchema.methods.genrateAccessToken = async function () {
      return jwt.sign(
        {
          _id: this._id,
          username : this.username,
          fullName : this.fullName,
          email : this.email,
          password : this.password,
          role : this.role,
          contact : this.contact,
          dateOfBirth : this.dateOfBirth ,
          gender : this.gender,
          addressLine1 : this.addressLine1,
          addressLine2 : this.addressLine2,
          pincode : this.pincode,
          yearsOfExperince : this.yearsOfExperince,
          subjectsTaught : this.subjectsTaught,
          professionalBiography : this.professionalBiography,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );
    };

    teacherSchema.methods.genrateRefreshToken = async function () {
      return jwt.sign(
        {
          _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
      );
    };

    export const Teacher = model("Teacher", teacherSchema);


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

    router.route("/admin/login").post(logginAdmin);

    router.route("/admin/logout").post(verifyAdminJWT, loggedOutAdmin);

    router.route("/admin/:id").get(verifyAdminJWT, getAdmin);

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

    router.route("/teacher/login").post(loggedInTeacher);

    router.route("/teacher/logout").post(verifyTeacherJWT, loggedOutTeacher);

    router.route("/teacher/:id").get(verifyTeacherJWT, getTeacher);

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

    router.route("/student/login").post(loggedInStudent);

    router.route("/student/logout").post(verifyStudentJWT, loggedOutStudent);

    router.route("/student/:id").get(verifyStudentJWT, getStudent);
      
    router
      .route("/student/refresh-token")
      .post(verifyStudentJWT, studentRefeshAccessToken);

    router
      .route("/student/change-password")
      .post(verifyStudentJWT, studentPasswordUpdate);


    export default router


    export class ApiError extends Error {
        constructor(
            statusCode,
            message,
            errors = [],
            stack,
        ) {
            super(message)
            this.statusCode = statusCode;
            this.message = message,
            this.errors = errors
            
            if (stack) {
                this.stack = stack
            }
        }
    }



    export class ApiResponse {
        constructor(
            statusCode,
            data,
            message = "suceess"
        ) {
            this.status = statusCode,
            this.data = data,
            this.message = message
            this.success < 500
        }
    }


    export const asyncHandler = (reqHandler) => {
        return (req, res, next) => {
            Promise
                .resolve(reqHandler(req, res, next))
                .catch((error) => next(error))
        }
    }


    import { v2 as cloudinary } from 'cloudinary'
    import { ApiError } from './ApiError.js'
    import fs from 'fs'

    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });


    export const fileupload = async function (localFilePath) {
      try {
          if (!localFilePath) {
                throw new ApiError(400,"localFilePath is required")
          }
          const response = await cloudinary.uploader.upload(localFilePath, {
              resource_type : 'auto'
          });
        console.log(`File uploaded successfully: ${response.secure_url}`);
          fs.unlinkSync(localFilePath)
          return response
      } catch (error) {
        fs.unlinkSync(localFilePath)
        throw new ApiError(400, error.message || "localFilePath file not found")
      }
    }

    import express from "express";
    import cors from 'cors'
    import cookieParser from 'cookie-parser'
    import { configDotenv } from 'dotenv'

    configDotenv({
      path : './.env'
    })

    const app = express();


    const limitOfAllTypes = '16kb'


    app.use(cors({
      origin: process.env.CORS_ORIGIN,
      credentials : true
    }))

    app.use(express.json(
      { limit: limitOfAllTypes }
    ))

    app.use(express.urlencoded({
      extended: true,
      limit : limitOfAllTypes
    }))

    app.use(express.static('public'))

    app.use(cookieParser());


    // import router

    import authRouter from './routes/user.route.js'
    import couresesRouter from './routes/course.route.js'

    // users ( admin/ teacher/ student )
    app.use('/edufusion/api/v2/users', authRouter)

    // courses
    app.use('/edufusion/api/v2/courses', couresesRouter)



    export default app



    import app from './app.js';
    import { connectDB } from './db/index.js'

    const port = process.env.PORT || 4000

    connectDB().then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    }).catch((error) => {
        console.log(`ERROR ON ${error.message || "error to connected the database"}`)
        process.exit(1)
    })

    PORT = 5000

    CORS_ORIGIN = *

    MONGODB_URI=mongo_url
    APP_NAME = EduFusion
    CLOUDINARY_API_SECRET="secret"
    CLOUDINARY_API_KEY="key"
    CLOUDINARY_URI="cloud-key"
    CLOUDINARY_CLOUD_NAME = "cloud-name"

    REFRESH_TOKEN_SECRET= "refresh-secret."
    ACCESS_TOKEN_SECRET="aceess-scret"
    REFRESH_TOKEN_EXPIRY=10d
    ACCESS_TOKEN_EXPIRY=1d






  using this code create a frontend web 
  vite , tailwind, redux 

  which structure you'll be give on files all are file will be coded and give's us

  and make sure give cors links for added 

    

  this is mine on backend {
        CORS_ORIGIN =*
  }

