"use client"

import { useCategories } from "@/hooks/useCategories"
import Card from "../Card"
import { Category } from "@/interfaces/Product"



export default function CategoriesCarousel() {

    // Fetch categories

    const { data, isLoading, error } = useCategories()




    if (isLoading) return <p>Loading categories...</p>
    if (error) return <p>Error loading categories</p>

    const categories: Category[] = data?.data || []

    return (
        <div className="flex flex-wrap gap-4 justify-center mt-3">
            {categories.slice(0, 4).map((cat) => (
                <Card category={cat} key={cat._id} />
            ))}
        </div>
    )
}
