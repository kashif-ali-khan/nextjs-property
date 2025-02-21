'use client';
import React from 'react'
import { useRouter, useParams, useSearchParams} from 'next/navigation';
import properties from '@/properties.json'
import PropertyCard from '@/components/PropertyCard';
export default function PropertyPage() {

    console.log(properties);

    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
  return (
    <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
            { properties.length === 0 ? (
                <p>No properties found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                        properties.map((property)=>(
                            <PropertyCard key={property._id} property={property} />
                        ))
                    }
                </div>
            )}
        </div>

    </section>
  )
}
