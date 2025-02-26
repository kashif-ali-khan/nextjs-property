import React from "react";
import PropertyDetail from "./PropertyDetails";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import ContactusForm from "@/components/ContactusForm";

export default function PropertyInfo({ property }) {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <PropertyDetail property={property} />
        <aside className="space-y-4">
          <BookmarkButton property={property} />
          <ShareButtons property={property} />

          <ContactusForm property={property} />

        </aside>
        </div>
      </div>
    </section>
  );
}
