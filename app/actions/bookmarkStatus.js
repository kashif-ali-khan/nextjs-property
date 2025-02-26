'use server';
import connectToDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getUserSession";

async function bookmarkStatus(propertyId) {
  await connectToDB();
  const session = await getSessionUser();
  const user = await User.findOne({ email: session.user.email });

  return user.bookmarks?.includes(propertyId);
}

export default bookmarkStatus;
