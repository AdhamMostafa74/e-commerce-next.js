"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import placeHolderImage from '@/assets/placeholder.webp'
import Link from "next/link"

interface Category {
    _id: string
    name: string
    image?: string
}

export default function CategoriesCarousel() {
    // Fetch categories



    const { data, isLoading, error } = useQuery({
        queryKey: ['getCategories'],
        queryFn: async () => {
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories',
                {
                    method: 'get',
                    cache: "force-cache"
                }
            )
            return res.json()
        }

    })

    const image = placeHolderImage

    if (isLoading) return <p>Loading categories...</p>
    if (error) return <p>Error loading categories</p>

    const categories: Category[] = data?.data || []

    return (
        <div className="flex flex-wrap gap-4 justify-center mt-3">
            {categories.slice(0, 4).map((cat) => (
                <div
                    key={cat._id}
                    className="w-52 bg-white rounded-lg shadow-md overflow-hidden
                     transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                    {/* Image */}
                    <div className="relative w-full min-h-52 p-2">
                        <Link href={`/${cat.name}`}>
                            <Image
                                src={cat.image || image}
                                alt={cat.name}
                                fill
                                className="object-cover p-2 rounded-2xl font-cursive"
                            />
                        </Link>
                    </div>

                    {/* Name */}
                    <div className="p-2 text-center font-medium text-gray-800">
                        {cat.name}
                    </div>
                </div>
            ))}
        </div>
    )
}
