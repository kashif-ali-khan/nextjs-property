"use server";
import connectToDB from "@/config/database";
import Message from "@/models/Message";
async function markMessageAsRead(messageId) {
  console.log(messageId, "MSGID");
  await connectToDB();
  const message = await Message.findById(messageId);
  if (!message) {
    return { error: "Invalid messageId" };
  }
  message.read = !message.read;
  await message.save();

  return message.read;
}

export default markMessageAsRead;
