


"use client"

import { useQuery } from "@tanstack/react-query"
import { Product } from "@/interfaces/Product"
import { baseUrl } from "./api"

interface ProductsResponse {
    data: Product[]
}

export function useProducts() {
    const query = useQuery<ProductsResponse>({
        queryKey: ["getProducts"],
        queryFn: async () => {
            const res = await fetch(baseUrl + "products", {
                cache: "force-cache",
            })

            if (!res.ok) {
                throw new Error("Failed to fetch products")
            }

            return res.json()
        },
    })

    return query
}




export function useProducts2(catId?: string) {
    return useQuery<ProductsResponse>({
        queryKey: ["getProducts", catId],

        queryFn: async () => {
            // 1️⃣ Create URL object
            const url = new URL(baseUrl + "products")

            // 2️⃣ Conditionally add query param
            if (catId) {
                url.searchParams.append("category[in]", catId)
                console.log(url.href)
            }

            // 3️⃣ Fetch
            const res = await fetch(url.toString(), {
                cache: "force-cache",
            })

            if (!res.ok) {
                throw new Error("Failed to fetch products")
            }

            return res.json()
        },

        // 4️⃣ Optional but recommended
        enabled: catId !== undefined,
    })
}


