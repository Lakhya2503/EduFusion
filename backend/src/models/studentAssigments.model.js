import { Schema, model } from "mongoose";

const studentAssignmentSubmissionSchema = new Schema(
    {
        studnetName: {
            type: String,
            required: true
        },
        studenId: {
            type: String,
            required: true
        },
        assignmentTitle: {
            type: String,
            required: true
        },
        assignmentDate: {
            type: Date,
            default : Date.now() ,
            required: true
        },
        uploadType: {
            type: String,
            required: true
        },
        addtionalComment: {
            type: String
        },
    isActive: {
      type: Boolean,
      enum: [true, false],
    },
  },
  { timestamps: true }
);

export const AssignmentSubmission = model(
  "AssignmentSubmission",
  studentAssignmentSubmissionSchema
);
