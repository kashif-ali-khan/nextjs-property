import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      street: String,
      state: String,
      city: String,
      zipcode: String,
    },
    beds: {
      type: Number,
    },
    baths: {
      type: Number,
    },
    square_feet: {
      type: Number,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      weekly: Number,
      monthly: Number,
      nightly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
