import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from "../utils/ApiError.js"
import { Admin } from '../models/admin.model.js'
import { fileupload } from '../utils/cloudinary.js'



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


export {
    registerAdmin
}