import { model, Schema } from "mongoose"


const coureseRating = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  value: {
    type: Number, 
    min: 1,
    max: 5,
  },
});

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    pdfLink: {
      type: String,
    },
    videoLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const couresesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    curriculum: [lessonSchema],
    basePrice: {
      type: Number,
      required: true,
    },
    offer: {
      type: Number,
      default: "",
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Admin" || "Teacher",
      required: true,
    },
    buyer: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    rating: [coureseRating],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export const Courses = model("Courses", couresesSchema)