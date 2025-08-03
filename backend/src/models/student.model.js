import { model, Schema } from "mongoose";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = new Schema(
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
    contact: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
      default: "",
    },
    role: {
      type: String,
      default: "Student",
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
      required: true,
    },
    purchesedCourse: [
      {
        type: Schema.Types.ObjectId,
        ref: "Purchase",
      },
    ],
    avatar: {
      type: String,
      required: true,
      default:
        "https://i.pinimg.com/1200x/e5/14/94/e51494da5d8263f1c9021f4c3b2d4555.jpg",
    },
    shortBio: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

studentSchema.methods.isPasswordValid = async function (password) {
  return await compare(password, this.password);
};

studentSchema.methods.genrateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      role: this.role,
      contact: this.contact,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      pincode: this.pincode,
      shortBio: this.shortBio,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

studentSchema.methods.genrateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Student = model("Student", studentSchema);