import { Schema, model } from "mongoose";

const teacherAssignementFormSchema = new Schema(
    {
        assignmentTitle: {
            type: String,
            required: true,
        },
        courseName: {
            type: String,
            required: true,
        },
        teacherName: {
            type: String,
        },
        deuDate: {
            type: Date,
        },
        learningObjective: {
            type: String,
        },
        taskInstructions: {
            type: String,
        },
        submissionMethod: {
            type: String,
            enum: ["online", "offline"],
        },
        submissionDetails: {
            type: String,
            required : true
        },
        submissionTime: { 
            type: Date
        },
        isActive : { 
        type: Boolean,
        enum: [
            true,
            false
        ]
        }
  },
  { timestamps: true }
);

export const TeacherAssignmentForm = model("TeacherAssignmentForm",teacherAssignementFormSchema)