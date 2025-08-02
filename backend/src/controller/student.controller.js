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
