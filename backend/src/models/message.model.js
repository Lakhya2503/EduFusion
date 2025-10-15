import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    reciver: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "reciverModel",
    },
    reciverModel: {
      type: String,
      required: true,
    },
    senderModel: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = model("Message", messageSchema);
