"use server";

import connectToDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getUserSession";
async function getUnreadCount() {
  await connectToDB();
  const session = await getSessionUser();
  const user = await User.findOne({ email: session.user.email }).lean();

  const messageCount = await Message.countDocuments({
    recipient: user._id,
    read: false,
  });

  return messageCount;
}

export default getUnreadCount;
