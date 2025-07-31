import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from "../utils/ApiError.js"
import { Admin } from '../models/admin.model.js'
import { fileupload } from '../utils/cloudinary.js'


const options = {
    httpOnly: true,
    secure : true
}

const genrateAccesstokenAndRefreshToken = async function (adminId) {
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

// const updateAdmin = asyncHandler(async (req, res) => {

//     const adminUpdate = await Admin.findByIdAndUpdate(req.params?._id, req.body, {
//         new : true
//     }).select("-password -refreshToken")

//     console.log(`adminUpdate : ${adminUpdate}`);
    

//     if (!adminUpdate) {
//         throw new ApiError(400, "user not found also be filed any update: ", adminUpdate)
//     }

//     return res
//       .status(200)
//       .json(
//         new ApiResponse(
//           200,
//           { adminUpdate: adminUpdate },
//           "user updated successfully"
//         )
//       );
// })


export {
    registerAdmin,
    logginAdmin,
    loggedOutAdmin,
    getAdmin,
    // updateAdmin
};