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

 