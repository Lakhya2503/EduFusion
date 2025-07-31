import { model, Schema } from "mongoose"

const coureseRating = new Schema({
    star : {
        type: Schema.Types.ObjectId,
        ref : "Student"
    },
})

const lessons = new Schema({
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
}, { timestamps : true });

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
    curriculum: [
      {
        lessons,
      },
    ],
    basePrice: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
      default: 0,
    },
    finalPrice: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Admin" || "Teacher",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    rating: {
      type: [coureseRating]
    },
  },
  { timestamps: true }
);

export const Coureses = model("Courses", couresesSchema)