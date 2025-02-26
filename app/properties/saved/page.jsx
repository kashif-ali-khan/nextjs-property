import PropertyCard from "@/components/PropertyCard";
import connectToDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getUserSession";

const SavePropertiesPage = async () => {
  await connectToDB();
  const session = await getSessionUser();
  const savedProperties = await User.findOne({
    email: session.user.email,
  }).populate("bookmarks");
  console.log("savedProperties", savedProperties);
  return (
    <section class="px-4 py-6">
      <div class="container-xl lg:container m-auto px-4 py-6">
        <h1 class="text-3xl font-bold mb-6">Your Saved Properties</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedProperties.bookmarks?.map((p) => (
            <PropertyCard property={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavePropertiesPage;
