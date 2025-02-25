"use server";
import connectToDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/utils/getUserSession";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";

async function addProperty(form) {
  await connectToDB();
  const session = await getSessionUser();
  const user = await User.findOne({ email: session.user.email }).lean();

  console.log(session, "FROM");
  if (!session || !session.user) {
    throw new Error("User id is required");
  }
  const amenities = form.getAll("amenities");
  const type = form.get("type");
  const images = form.getAll("images").filter((image) => image.name !== "");

  const imageFiles = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imgBase64 = imageData.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imgBase64}`,
      {
        folder: "propertypulsenext",
      }
    );
    imageFiles.push(result.secure_url);
  }

  const property = {
    owner: user._id,
    name: form.get("type"),
    type: form.get("type"),
    description: form.get("description"),
    location: {
      street: form.get("location.street"),
      state: form.get("location.state"),
      city: form.get("location.city"),
      zipcode: form.get("location.zipcode"),
    },
    beds: form.get("beds"),
    baths: form.get("baths"),
    square_feet: form.get("square_feet"),
    amenities,
    rates: {
      nightly: form.get("rates.weekly"),
      weekly: form.get("rates.weekly"),
      monthly: form.get("rates.monthly"),
    },
    seller_info: {
      name: form.get("seller_info.name"),
      email: form.get("seller_info.email"),
      phone: form.get("seller_info.phone"),
    },
  };

  console.log("Property", property);
  property.images = imageFiles;
  const newProperty = new Property(property);
  await newProperty.save();
  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
