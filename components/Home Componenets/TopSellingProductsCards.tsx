"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import placeHolderImage from '@/assets/placeholder.webp'
import Link from "next/link"
import { Product } from "@/interfaces/Product"
import { useMemo } from "react"
import { Star } from "lucide-react" // using lucide-react for icons

export default function TopSellingProductsCard() {



    const { data, isLoading, error } = useQuery({
        queryKey: ['getProducts'],
        queryFn: async () => {
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
                method: 'get',
                cache: "force-cache"
            })
            return res.json()
        }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const products: Product[] = data?.data || []

    const randomProducts = useMemo(() => {
        return [...products].sort(() => 0.5 - Math.random()).slice(0, 4)
    }, [products])

    const image = placeHolderImage

    if (isLoading) return <p>Loading products...</p>
    if (error) return <p>Error loading products</p>




    return (
        <div className="flex flex-wrap gap-4 justify-center mt-3">
            {randomProducts.map((product) => (
                <div
                    key={product._id}
                    className="w-52 bg-white rounded-lg shadow-md overflow-hidden py-3 flex flex-col justify-between
                     transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                    {/* Image */}
                    <div className="relative w-full lg:h-64 md:h-48  rounded-xl pb-3 border-b">
                        <Link href={`/${product.title}`}>
                            <div className=" shadow-2xl">
                                <Image
                                    src={product.imageCover || image}
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
                </div>
            ))}
        </div>
    )
}
