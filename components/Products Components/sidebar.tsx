"use client"

import { useState } from "react"
import { useCategories } from "@/hooks/useCategories"
import { Category } from "@/interfaces/Product"
import { SlidersHorizontal } from "lucide-react"

type SidebarProps = {
    minPrice: number
    maxPrice: number
    setMinPrice: (value: number) => void
    setMaxPrice: (value: number) => void
}

export default function Sidebar({
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
}: SidebarProps) {
    const { data } = useCategories()
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* 🧲 Filter Button (ALL sizes) */}
            <button
                onClick={() => setOpen(true)}
                className="
          flex items-center gap-2
          bg-white text-gray-700
          px-4 py-2
          rounded-lg
          shadow
          border
         hover:bg-slate-300 
          cursor-pointer
          transition
        "
            >
                <SlidersHorizontal size={18} />
                <span className="text-sm font-medium ">Filters</span>
            </button>

            {/* 🧱 Sidebar Drawer */}
            <aside
                className={`
          fixed
          top-0 left-0
          h-full
          w-80
          bg-slate-200
          p-4
          border-r
          space-y-6
          z-50
          transform
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                {/* ❌ Close */}
                <div className="flex justify-between items-center ">
                    <span className="font-semibold text-lg">Filters</span>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-500 hover:text-gray-800 text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Filter by Price */}
                <div className="space-y-4">
                    <span className="font-semibold text-lg">Filter by price</span>

                    <div className="space-y-1">
                        <span className="text-sm text-gray-600">
                            Min Price: ${minPrice}
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={20000}
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </div>

                    <div className="space-y-1">
                        <span className="text-sm text-gray-600">
                            Max Price: ${maxPrice}
                        </span>
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
                    <div className="font-semibold text-lg border-b pb-2 border-gray-600">
                        Categories
                    </div>
                    <ul className="space-y-1">
                        {data?.data?.map((category: Category) => (
                            <li
                                key={category._id}
                                className="cursor-pointer text-gray-700 hover:text-blue-500"
                                onClick={() => setOpen(false)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* 🌫 Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}
        </>
    )
}
