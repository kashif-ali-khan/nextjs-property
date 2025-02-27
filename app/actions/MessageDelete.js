'use server';
import connectToDB from "@/config/database";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";
const DeleteMessage = async (messageId) => {
  console.log(messageId, "messageId");
  await connectToDB();

  const message = await Message.findById(messageId);
  console.log(message, "message");

  if (!message) {
    throw new Error("Invalid message ID");
  }

  await message.deleteOne();
  revalidatePath("/pm", "pages");
  return true;
};

export default DeleteMessage;
