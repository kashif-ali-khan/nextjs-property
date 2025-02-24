import React from "react";
import PropertyDetail from "./PropertyDetails";

export default function PropertyInfo({ property }) {
  return (
    <section class="bg-blue-50">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <PropertyDetail property={property} />
        </div>
      </div>
    </section>
  );
}
