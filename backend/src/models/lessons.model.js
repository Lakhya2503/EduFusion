import { model, Schema } from "mongoose";

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    pdfLink: {  
      type: String,
    },
    videoLink: {
      type: String,
    },
    duration: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true 
  }
);

export const Lesson = model('Lesson', lessonSchema);