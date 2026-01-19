"use client"

import { useQuery } from "@tanstack/react-query"
import { Category } from "@/interfaces/Product"

interface CategoriesResponse {
    data: Category[]
}

export function useCategories() {
    const query = useQuery<CategoriesResponse>({
        queryKey: ["getCategories"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
                cache: "force-cache",
            })

            if (!res.ok) {
                throw new Error("Failed to fetch categories")
            }

            return res.json()
        },
    })

    return query
}
