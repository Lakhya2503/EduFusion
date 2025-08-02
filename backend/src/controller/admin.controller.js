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