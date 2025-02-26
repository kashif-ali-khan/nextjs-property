import PropertyCard from "@/components/PropertyCard";
import PropertySearch from "@/components/PropertySearch";
import connectToDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResults = async ({
  params,
  searchParams: { location, propertyType },
}) => {
  console.log(location, "---s-s-s-s", propertyType);
  await connectToDB();

  const locationRegex = new RegExp(location, "i");
  const query = {
    $or: [
      { name: locationRegex },
      { description: locationRegex },
      { "location.street": locationRegex },
      { "location.city": locationRegex },
      { "location.state": locationRegex },
      { "location.zipcode": locationRegex },
    ],
  };

  if (propertyType && propertyType !== "All") {
    query.type = new RegExp(propertyType, "i");
  }

  const searchProp = await Property.find(query).lean();
  const sp = searchProp.map(convertToSerializeableObject);
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl max-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearch />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl  lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2" /> Back to properties
          </Link>

          <h1 className="text-2xl mb-4"> Search results</h1>
          {sp.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
              {sp.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResults;
