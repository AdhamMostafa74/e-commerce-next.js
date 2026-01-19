import { Category, Product } from '@/interfaces/Product'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import placeHolderImage from '@/assets/placeholder.webp'



type productProps = {
    product?: Product
    category?: Category
}
export default function Card({ product, category }: productProps) {



    return (
        <div className="flex flex-wrap gap-4 justify-center mt-3">

            {product ? <div
                key={product._id}
                className="w-52 bg-white rounded-lg shadow-md overflow-hidden 
                    py-3 flex flex-col justify-between
                     transform transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
                {/* Image */}
                <div className="relative w-full h-48 lg:h-64 md:h-48 sm:h-48 rounded-xl pb-3 border-b">
                    <Link href={`/${product.title}`}>
                        <div className=" shadow-2xl">
                            <Image
                                src={product.imageCover || placeHolderImage}
                                alt={product.title}
                                fill
                                className="object-cover p-2 rounded-2xl font-cursive"
                            />
                        </div>
                    </Link>
                </div>

                {/* Name */}
                <div className="p-2 text-center font-medium text-gray-800">
                    {product.title.length > 50
                        ? product.title.slice(0, 50) + "..."
                        : product.title}
                </div>


                <div>
                    {/* Price */}
                    <div className="text-center text-blue-500 font-semibold">
                        ${product.price?.toFixed(2) || "0.00"}
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                fill={i < Math.round(product.ratingsAverage || 0) ? "#F59E0B" : "none"} // gold or empty
                                stroke={i < Math.round(product.ratingsAverage || 0) ? "#F59E0B" : "#D1D5DB"} // stroke color
                            />

                        ))}
                    </div>
                </div>
            </div> :
                <div
                    key={category?._id}
                    className="w-52 bg-white rounded-lg shadow-md overflow-hidden 
                    py-3 flex flex-col justify-between
                     transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                    {/* Image */}
                    <div className="relative w-full lg:h-64 md:h-48  rounded-xl pb-3 border-b">
                        <Link href={`/${category?.name}`}>
                            <Image
                                src={category?.image || placeHolderImage}
                                alt={category!.name}
                                fill
                                className="object-cover p-2 rounded-2xl font-cursive"
                            />
                        </Link>
                    </div>

                    {/* Name */}
                    <div className="p-2 text-center font-medium text-gray-800">
                        {category?.name}
                    </div>
                </div>
            }

        </div>
    )
}
