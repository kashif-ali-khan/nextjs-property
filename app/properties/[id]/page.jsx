import React from 'react'

export default function PropertyByIdPage({params, searchParams}) {
    const searchParam = searchParams.kashif;
  return (
    <div>
      PropertyByIdPage

      Property No {params.id} {searchParam}
    </div>
  )
}
