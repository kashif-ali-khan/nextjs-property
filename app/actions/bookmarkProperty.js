"use server";
import connectToDB from "@/config/database";
import { getServerSession } from "next-auth/next";
import User from "@/models/User";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectToDB();
  const session = await getServerSession();
  console.log(session,'dddd')
  const user = await User.findOne({ email: session.user.email });
  const isBookmarked = user.bookmarks?.includes(propertyId);
  let bk = {
    message: "",
    isBookmarked: false,
  };

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    bk.message = "Bookmark Removed";
    bk.isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    bk.message = "Bookmark Saved";
    bk.isBookmarked = true;
  }
  await user.save();
  revalidatePath('/property/saved', 'page');
  return bk;
}

export default bookmarkProperty;
