"use server";

import connectToDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getUserSession";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

const deleteProperty = async (propertyId) => {
    console.log(propertyId,'propertyIdpropertyId')
  await connectToDB();
  const session = await getSessionUser();
  const user = await User.findOne({ email: session.user.email }).lean();

  if (!propertyId) {
    throw new Error("Property Id is required");
  }
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }
  console.log(property.owner,'----',user._id)
  if (property.owner.toString() !== user._id.toString()) {
    throw new Error("Unauthorised to delete this property");
  }

  // delete images

  const publicImages = property.images.map((image) =>
    image.split("/").at(-1).split(".").at(0)
  );

  if (publicImages.length > 0) {
    for (const pi of publicImages) {
      await cloudinary.uploader.destroy(`propertypulsenext/${pi}`);
    }
  }

  await property.deleteOne();
  revalidatePath("/", "layout");
};

export default deleteProperty;
