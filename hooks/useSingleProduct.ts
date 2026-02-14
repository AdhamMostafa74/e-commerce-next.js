


"use client"

import { useQuery } from "@tanstack/react-query"
import { ParamValue } from "next/dist/server/request/params"
import { baseUrl } from "./api"


export function useSignleProduct(productId: ParamValue) {
    const query = useQuery({
        queryKey: ["getProductDetails"],
        queryFn: async () => {
            const res = await fetch(baseUrl + "products/" + productId)

            if (!res.ok) {
                throw new Error("Failed to fetch product details")
            }

            return res.json()
        },
    })

    return query
}


