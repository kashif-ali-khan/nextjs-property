import React from "react";
//import Link from 'next/link';
import InfoBox from "./InfoBox";

export default function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={"For Renters"}
            description={`Find your dream rental property. Bookmark properties and contact
            owners.`}
            info={{
              bgClass: "bg-gray-100",
               path: "/properties",
               linkLabel:" Browse Properties"
            }}
          />
          <InfoBox
            heading={"For Property Owners"}
            description={`List your properties and reach potential tenants. Rent as an
            airbnb or long term.`}
            info={{
                bgClass: "bg-blue-100",
                path: "/properties/add",
                  linkLabel:" Add Property"
              }}
          />
         
        </div>
      </div>
    </section>
  );
}
