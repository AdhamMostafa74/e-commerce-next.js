"use client"

import { useCategories } from "@/hooks/useCategories"
import { Category } from "@/interfaces/Product"

type SidebarProps = {
    minPrice: number
    maxPrice: number
    setMinPrice: (value: number) => void
    setMaxPrice: (value: number) => void
}

export default function Sidebar({ minPrice, maxPrice, setMinPrice, setMaxPrice }: SidebarProps) {


    const { data } = useCategories()

    return (
        <aside className="w-full p-4 border rounded-lg bg-slate-200 space-y-6">
            {/* Filter by Price */}
            <div className="space-y-4">
                <span className="font-semibold text-lg">Filter by price</span>

                {/* Min Price */}
                <div className="space-y-1">
                    <span className="text-sm text-gray-600">Min Price: ${minPrice}</span>
                    <input
                        type="range"
                        min={0}
                        max={20000}
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>

                {/* Max Price */}
                <div className="space-y-1">
                    <span className="text-sm text-gray-600">Max Price: ${maxPrice}</span>
                    <input
                        type="range"
                        min={0}
                        max={20000}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
                <div className="font-semibold text-lg border pb-2 border-b-gray-600 ">
                    <span>Categories</span>

                </div>
                <ul className="space-y-1">
                    {data?.data?.map((category: Category) => (
                        <li
                            key={category._id}
                            className="cursor-pointer text-gray-700 hover:text-blue-500"
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
