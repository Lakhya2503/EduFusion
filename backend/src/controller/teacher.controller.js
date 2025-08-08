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
      .json(new ApiResponse(
       200,
           loginTeacher,
          "user loggedIn successFully"
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
   req.student._id

    const teacher = await Teacher.findById(req.teacher._id).select(
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
