import React from 'react';
import Link from 'next/link';

export default function InfoBox({heading, description, info }) {
  return (
    <div className={`${info.bgClass} p-6 rounded-lg shadow-md`}>
    <h2 className="text-2xl font-bold">{heading}</h2>
    <p className="mt-2 mb-4">
     {description}
    </p>
    <Link
      href={info.path}
      className={`inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
    >
      Browse Properties
      </Link>
  </div>
  )
}
