import { model, Schema } from 'mongoose'

const purchaseSchema = new Schema(
  {
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "Student",
     },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        requied : true
    },
    amount: {
        type: Number,
        required : true
    },
  },
  { timestamps: true }
);
    
export const Purchase = model("Purchase", purchaseSchema);