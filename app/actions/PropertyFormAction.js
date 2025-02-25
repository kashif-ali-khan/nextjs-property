"use server";
import connectToDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/utils/getUserSession';
import { revalidatePath } from "next/cache";

async function addProperty(form) {
  await connectToDB();
  const session = await getSessionUser();
  const user = await User.findOne({ email: session.user.email }).lean();

  console.log(session,'FROM')
  if(!session || !session.user){
    throw new Error("User id is required");
    
  }
  const amenities = form.getAll("amenities");
  const type = form.get("type");
  const images = form
    .getAll("images")
    .filter((image) => image.name !== "")
    .map((image) => image.name);

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
    images,
  };

  console.log("Property", property);

  const newProperty = new Property(property);
  await newProperty.save();
  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`)
}

export default addProperty;
