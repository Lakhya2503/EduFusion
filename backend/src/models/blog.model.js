import { model, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    contentType: {
      type: String,
      default: "",
    },
    blogThumbnail: {
      type: String,
      default:
        "https://i.pinimg.com/1200x/72/d8/a8/72d8a8239b9952cb9ff11ffd2bfa6952.jpg",
    },
    blogHeading: {
      type: String,
      required: true,
    },
    blogPara: {
      type: String,
      required: true,
    },
    blogOwner: {
      type: Schema.Types.ObjectId,
      ref: "Student", 
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Blog = model("Blog", blogSchema);
