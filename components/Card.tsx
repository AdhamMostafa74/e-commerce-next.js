'use client'

import { Category, Product } from '@/types/Product'
import { Heart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import placeHolderImage from '@/assets/placeholder.webp'
import AddToCartButton from '@/utilities/AddToCartButton'
import { useAddWishlist } from '@/hooks/useWishlist'



type productProps = {
    product?: Product;
    category?: Category;
    wishlist?: boolean;
}
export default function Card({ product, category, wishlist }: productProps) {

    const { mutate } = useAddWishlist()
    return (
        <div className="flex flex-wrap gap-4 justify-center mt-3">

            {/* product part */}
            {product ? <div
                key={product._id}
                className="w-52 bg-white rounded-lg shadow-md overflow-hidden 
                    py-3 flex flex-col justify-between
                     transform transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
                {/* Image */}
                <div className="relative w-full h-48 lg:h-64 md:h-48 sm:h-48 rounded-xl pb-3 border-b">

                    {/* 🏷 Brand Banner */}
                    <span
                        className="
                            absolute top-3 left-3 z-10
                            bg-blue-500 text-white
                            text-xs italic
                            px-3 py-1
                            rounded-full
                            shadow-md
                            font-cursive
                            "
                    >
                        {product.brand.name}
                    </span>
                    {/* wishlist icon */}
                    <button
                        onClick={() => mutate(product!._id)}
                        className="
                            absolute top-3 right-3 z-10
                             bg-transparent 
                            text-xs italic
                            p-1
                            rounded-full
                            shadow-md
                            font-cursive
                            
                            "
                    >
                        <Heart fill={`${wishlist ? 'red' : 'transparent'}`} className='bg-transparent
                                       fill-transparent
                                        stroke-current
                                        transition-all
                                        duration-300
                                        hover:fill-red-500
                                        hover:scale-110' />
                    </button>

                    <Link href={`/ProductDetails/${product._id}`}>
                        <div className="shadow-2xl">
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
                <div className="text-center text-slate-400 ">
                    {product.category.name}

                </div>


                <div>
                    {/* Price */}
                    <div className="text-center text-blue-500 font-semibold">
                        ${product.price?.toFixed(2) || "0.00"}
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-2">
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
                        <span className="text-gray-500 font-medium block  align-top">
                            {product.ratingsQuantity}

                        </span>
                    </div>
                </div>

                <div className=' px-5 flex'>
                    <AddToCartButton
                        productId={product._id}
                    />
                </div>
            </div> :

                // category part
                <div
                    key={category?._id}
                    className="w-56 bg-white rounded-lg shadow-md overflow-hidden 
               py-3 flex flex-col justify-between
               transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                    {/* Image */}
                    <div className="relative w-full h-40 sm:h-48 md:h-48 lg:h-64 rounded-xl border-b">
                        <Link href={`Category/${category?._id}`}>
                            <Image
                                src={category?.image || placeHolderImage}
                                alt={category!.name}
                                fill
                                sizes="(max-width: 640px) 200px,
                       (max-width: 768px) 240px,
                       260px"
                                className="object-cover p-2 rounded-2xl"
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
