import { Admin } from "../models/admin.model.js";
import { Message } from "../models/message.model.js";
import { Student } from "../models/student.model.js";
import { Teacher } from "../models/teacher.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {
  const message = req?.body?.text;

  if (message === "") {
    throw new ApiError(404, "message must be required");
  }

  console.log(message);

  const senderId = req?.body?.senderId;
  const reciverId = req?.body?.reciverId;

  console.log(`senderId: ${senderId}`);
  console.log(`reciverId: ${reciverId}`);

  const senderStudent = await Student.findById(senderId).select(
    "-refreshToken -password"
  );
  const senderTeacher = await Teacher.findById(senderId).select(
    "-refreshToken -password"
  );
  const senderAdmin = await Admin.findById(senderId).select(
    "-refreshToken -password"
  );

  const reciverStudent = await Student.findById(reciverId).select(
    "-refreshToken -password"
  );
  const reciverTeacher = await Teacher.findById(reciverId).select(
    "-refreshToken -password"
  );
  const reciverAdmin = await Admin.findById(reciverId).select(
    "-refreshToken -password"
  );

  let messageSender;
  if (senderStudent) {
    messageSender = senderStudent;
  } else if (senderAdmin) {
    messageSender = senderAdmin;
  } else if (senderTeacher) {
    messageSender = senderTeacher;
  }

  let messageReciver;
  if (reciverAdmin) {
    messageReciver = reciverAdmin;
  } else if (reciverStudent) {
    messageReciver = reciverStudent;
  } else if (reciverTeacher) {
    messageReciver = reciverTeacher;
  }

  const sendMessage = await Message.create({
    reciver: messageReciver.id,
    sender: messageSender.id,
    reciverModel: messageReciver.username,
    senderModel: messageSender.username,
    text: message,
  });

  sendMessage.save();

  return res
    .status(200)
    .json(new ApiResponse(200, sendMessage, "message sent successfully"));
});

const recieveMessage = asyncHandler(async (_, res) => {

  const message = await Message.find()
  console.log(message);

  return res.status(200).json(new ApiResponse(200, message));
});

export { sendMessage, recieveMessage };
