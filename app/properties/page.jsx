import React from "react";
import PropertyCard from "@/components/PropertyCard";
import connectToDB from "@/config/database";
import Property from "@/models/Property";
import PaginationComponent from "@/components/PaginationComponent";

export default async function PropertyPage({
  searchParams: { page = 1, pageSize = 2 },
}) {
  await connectToDB();
  const skip = (page - 1) * pageSize;

  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();
  const totalNoOfPages = await Property.countDocuments();
  console.log(page, "---", pageSize);
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
           
          </div>
          
          </>
        )}
        <PaginationComponent
              page={parseInt(page)}
              pageSize={parseInt(pageSize)}
              totalItems={parseInt(totalNoOfPages)}
            />
      </div>
    </section>
  );
}
