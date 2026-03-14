import crypto from 'crypto';
import path from 'path';
import User from '../models/user.models.js';
import parseData from '../parser/index.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { secretKeyUse } from '../utils/helper.js';

const options = {
  httpOnly : true,
  secure : true
}

const generateAccessRefreshToken = async(userId) => {

    const user = await User.findById(userId)

     const accessToken = await user.generateAccessToken()
    const refreshToken = await  user.generateRefreshToken()

    user.refreshToken = refreshToken

    await user.save({validateBeforeSave : true})


    return {
      accessToken,
      refreshToken
    }

}

const registerUser = asyncHandler(async(req,res)=> {

      const { username, email, password, secretkey  } = req.body

      if([username,email,password].some((field)=> String(field).trim() === "" || field === undefined || field === null)) {
        throw new ApiError(400, "all fields are required")
      }

      const role = secretKeyUse(secretkey)


        const userRegister = await User.create({
          username,
          password,
          email,
          role,
          isEmailVerified : false
      })


      const { unHashedToken, hashToken, tokenExpiry } = await userRegister.generateTemporaryToken()



      userRegister.emailVerificationExpiry = tokenExpiry
      userRegister.emailVerificationToken = hashToken

      userRegister.save({ validateBeforeSave : true})

      console.log("user", userRegister);

      console.log(`${req.protocol}://${req.get("host")}/api/v1/edu/auth/verify-email/${unHashedToken}`);

      const register = await User.findById(userRegister._id).select("-password -emailVerificationExpiry -emailVerificationToken")

      if(!register) throw new ApiError(500, "sorry user can't ... please try again leter....!!!")


    return res.status(200).json(new ApiResponse(200, {}, "User Register successfully"))
})

const verifyEmail = asyncHandler(async(req,res)=>{

    const { token } =  req.params

    const hashToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")

    console.log(hashToken);


    const user = await User.findOne({
      emailVerificationToken : hashToken,
      emailVerificationExpiry :  {$gt : Date.now()}
    })

    console.log("user", user);



  if(!user) {
    throw new ApiError(400, "user can't exist")
  }

      user.isEmailVerified = true
      user.emailVerificationToken = undefined
      user.emailVerificationExpiry = undefined

  await user.save({ validateBeforeSave : true })

  await User.findById(user._id)
  .select("-password -refreshToken -emailVerificationExpiry -emailVerificationToken -forgetPasswordToken -forgetPasswordExpiry")

  return res.status(200).json(new ApiResponse(200, {}, "user email verify Successfully"))
})

const resendEmailVerification = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id)

    if(!user) {
      throw new ApiError(400, "User doen't exist")
    }

    const { hashToken , tokenExpiry, unHashedToken } = await user.generateTemporaryToken()

    user.emailVerificationToken = hashToken
    user.emailVerificationExpiry = tokenExpiry

    console.log("user",user);


    await user.save({ validateBeforeSave : true })

          console.log(`${req.protocol}://${req.get("host")}/api/v1/edu/auth/verify-email/${unHashedToken}`);

    return res.status(200).json(new ApiResponse(200, {}, "email verified link send on your register email "))
})

const loggedInUser = asyncHandler(async(req,res)=>{

    const { email, password } = req.body

    if([email,password].some((field)=> String(field)=== "" || field === undefined || field === null))   {
      throw new ApiError(400, "email and password are required")
    }

    const loggedInUser =  await User.findOne({
     email
    }
    )

  // const passwordValid =  await loggedInUser.isPasswordCorrect(password)

  // if(!passwordValid) {
  //   throw new ApiError(400, "please ensert valid password")
  // }


    if(!loggedInUser) {
      throw new ApiError(400, "user don's not exist")
    }

    const  { accessToken, refreshToken }  = await generateAccessRefreshToken(loggedInUser._id)


    const user = await User.findById(loggedInUser._id).select("-password -refreshToken  -emailVerificationToken -emailVerificationExpiry ")


    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, user, "User logged in Successfully"))
})

const loggedOut  = asyncHandler(async(req,res)=>{

      await User.findByIdAndUpdate(req.user._id, {
          $set : {
            refreshToken : ""
          }
      }, { save : true })

      return res.status(200).json(new ApiResponse(200, {}, "User logged Out successfully"))
})

const fetCurrentUser =  asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")

  return res.status(200).json(new ApiResponse(200, user , "User fetch successfully"))
})

const forgetPasswordRequest = asyncHandler(async(req,res)=>{

      const { email } = req.params

    const user = await User.findOne({email})

    console.log(`user : ${user}`);


    const { hashToken, tokenExpiry, unHashedToken } =  await user.generateTemporaryToken()

    user.forgetPasswordToken = hashToken
    user.forgetPasswordExpiry = tokenExpiry

    await user.save({ validateBeforeSave : true })

    console.log(`${req.protocol}://${req.get("host")}${process.env.FORGET_PASSWORD_URL}/${unHashedToken}`);

  return res.status(200).json(new ApiResponse(200, {}, "forget password request send on register email"))
})

const resetForgetPassword = asyncHandler(async(req,res)=>{

    const { token } = req.params
    const { newPassword } = req.body

   const hashToken = crypto
          .createHash("sha256")
          .update(token)
          .digest("hex")

      const user = await User.findOne({
          forgetPasswordToken : hashToken,
          forgetPasswordExpiry : {$gt : Date.now()}
      });

    if(!user) {
      throw new ApiError(400, `some thing wen't wrong try again some time`)
    }

    user.forgetPasswordToken = undefined
    user.forgetPasswordExpiry = undefined

    user.password = newPassword

    await  user.save({validateBeforeSave : true})

    return res.status(200).json(new ApiResponse(200, {}, "Password change successfully"))
})

const addBulkUsers = asyncHandler(async(req,res)=>{

      const file = req.files?.userList[0]?.path;

      const fileExtension = path.extname(file);

      const parsingdata = await parseData(file, fileExtension)   // todo : this return parse data

      const userAlreadyExistOnServer = []

      const newUserFromClient = []

      const notValidData = []

      const allUserSId = parsingdata.map(i => i._id)

      const existingUser = await User.find({_id : {$in : allUserSId}}).select('_id')

      const existedUsersIdSet = new Set(existingUser.map(i => i._id.toString()))

     for(const users of parsingdata) {

      const { username = "", email = "", password = "", secretkey = "" } = users

      const role = secretKeyUse(secretkey)

       const emptyFiled = [username,email,password]
       .filter(field => String(field).trim() === "" || field === undefined || field === null)

       if(emptyFiled.length > 0) {
        notValidData.push({user : users, missingFiled : emptyFiled})
          continue;
         }

         if(existedUsersIdSet.has(username)){
           userAlreadyExistOnServer.push(users)
            continue;
          }

          newUserFromClient.push({ username, password : password, email, role : role }) }

          let insertedUsers = [];

          try { insertedUsers = await User.insertMany(newUserFromClient, { ordered: false });

        } catch (err) { console.error("Insert error:", err.writeErrors);
          insertedUsers = err.insertedDocs || [];
        }
           console.log("Inserted Users:", insertedUsers.length);

        return res
          .status(200)
          .json(
              new ApiResponse(
                200,
                {
                  newUserFromClient,
                  userAlreadyExistOnServer,
                  notValidData
                },
            "Users add successfully"))
})


export {
  addBulkUsers,
  fetCurrentUser,
  forgetPasswordRequest,
  loggedInUser,
  loggedOut,
  registerUser,
  resendEmailVerification,
  resetForgetPassword,
  verifyEmail
};
