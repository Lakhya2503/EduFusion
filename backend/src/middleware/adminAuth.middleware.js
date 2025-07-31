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