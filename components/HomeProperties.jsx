import React from 'react'
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import connectToDB from '@/config/database';
import Property from '@/models/Property';

export default async function HomeProperties() {
 // const recentProperties = properties.slice(0,3);  
  await connectToDB();
  const recentProperties = await Property.find({}).sort({createdAt: -1}).limit(3)
  return (
    <>
        <section className="px-4 py-6">
            <h2 className="text-3xl font-bold  text-blue-500 mb-6 text-center">Recent Property</h2>
        <div className="container-xl lg:container m-auto px-4 py-6">
            { recentProperties.length === 0 ? (
                <p>No properties found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                        recentProperties.map((property)=>(
                            <PropertyCard key={property._id} property={property} />
                        ))
                    }
                </div>
            )}
        </div>

    </section>
    
    <section className="m-auto max-w-lg my-5 px-6">
        <Link className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700 " href="/properties">View All properties</Link>
    </section>
    </>
  )
}
