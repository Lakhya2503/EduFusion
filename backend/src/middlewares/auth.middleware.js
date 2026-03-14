import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async(req,_,next)=>{

        const token = req.cookies.accessToken

      try {

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            if(!decodedToken) {
              throw new ApiError(400, "token expired")
            }

            const user = await User.findById(decodedToken._id)

              if(!user) {
                throw new ApiError(400, "token used or expired")
              }

            req.user = user

            next()

      } catch (error) {
          throw new ApiError(400, "token used or expired")
      }
})

export default verifyJWT
