'use server';
import connectToDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getUserSession";

async function addMessage(prevState, formData) {
  await connectToDB();
  const session = await getSessionUser();
  const user = await User.findOne({ email: session.user.email });

  if (!user._id) {
    return { error: "User id is required" };
  }

  if (formData.get("recipient") === user._id) {
    return { error: "Cannot send message to yourself" };
  }

  const a = {
    sender: user._id,
    recipient: formData.get("recipient"),
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("message"),
  }
  const message = new Message(a);
  await message.save();
  return {
    submitted: true,
  };
}

export default addMessage;
