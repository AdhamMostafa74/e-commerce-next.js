'use client'

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Product } from "@/interfaces/Product"

type ProductBreadcrumbProps = Pick<
    Product,
    "title" | "category" | "brand"
>

export default function ProductBreadcrumb({
    title,
    category,
    brand,
}: ProductBreadcrumbProps) {
    return (
        <nav className="flex items-center text-2xl text-gray-600 flex-wrap py-8 border-b-2  ps-12">
            {/* Category */}
            <Link
                href={`/category/${category?.name}`}
                className="hover:text-blue-500 transition-colors"
            >
                {category?.name}
            </Link>

            <ChevronRight size={24} className="mx-2 text-gray-400" />

            {/* Brand */}
            <Link
                href={`/brand/${brand?.name}`}
                className="hover:text-blue-500 transition-colors"
            >
                {brand?.name}
            </Link>

            <ChevronRight size={24} className="mx-2 text-gray-400" />

            {/* Product title */}
            <span className="text-gray-900 font-medium truncate max-w-50">
                {title}
            </span>
        </nav>
    )
}
