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