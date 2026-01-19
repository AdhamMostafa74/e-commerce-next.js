


"use client"

import { useQuery } from "@tanstack/react-query"
import { Product } from "@/interfaces/Product"

interface ProductsResponse {
    data: Product[]
}

export function useProducts() {
    const query = useQuery<ProductsResponse>({
        queryKey: ["getProducts"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
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


