'use client';
import Image from "next/image";
import Link from "next/link";
import deleteProperty from "@/app/actions/PropertyDelete";
import { useState } from "react";
const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);
  const delProperty = async (propertyId) => {
    const isConfirmed = window.confirm("Are you sure to delete");
    if (!isConfirmed) {
      return;
    } else {
      await deleteProperty(propertyId);
      setProperties((properties)=>properties.filter(p=>p._id!==propertyId))
    }
  };
  return (
    <>
      {properties.map((property, index) => (
        <div className="mb-10" key={index}>
          <Link href={`properties/${property.id}`}>
            <Image
              className="h-32 w-full rounded-md object-cover"
              src={property.images[0]}
              width={0}
              height={0}
              sizes="100vw"
              alt={`${property.name}`}
            />
          </Link>
          <div className="mt-2">
            <p className="text-lg font-semibold">Property {property.name}</p>
            <p className="text-gray-600">
              Address: {property.location.city} {property.location.state},{" "}
              {property.location.zipcode}
            </p>
          </div>
          <div className="mt-2">
            <Link
              href={`/properties/add`}
              className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              type="button"
              onClick={() => delProperty(property._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProfileProperties;
