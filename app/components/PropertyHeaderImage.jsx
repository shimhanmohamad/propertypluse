import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const PropertyHeaderImage = ({ image }) => {
  return (
    <>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`/properties/${image}`}
            alt="Property image"
            className="object-cover h-[400px] w-full"
            width={1200}
            height={400}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>

      
    </>
  )
}

export default PropertyHeaderImage