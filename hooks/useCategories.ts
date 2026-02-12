"use client"

import { useQuery } from "@tanstack/react-query"
import { Category } from "@/interfaces/Product"
import { baseUrl } from "./api"
import { ParamValue } from "next/dist/server/request/params"

interface CategoriesResponse {
    data: Category[]
}




export function useCategories() {
    const query = useQuery<CategoriesResponse>({
        queryKey: ["getCategories"],
        queryFn: async () => {
            const res = await fetch(baseUrl + "categories", {
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


export function useSingleCategory(categoryId: ParamValue) {
    const query = useQuery<Category>({
        queryKey: ["getSingleCategory", categoryId],
        queryFn: async () => {
            const res = await fetch(baseUrl + `categories/${categoryId}`,
                {
                    cache: "force-cache",
                })
            if (!res.ok) {
                throw new Error("Failed to fetch category")
            }
            return res.json()

        }

    })
    return query

}
