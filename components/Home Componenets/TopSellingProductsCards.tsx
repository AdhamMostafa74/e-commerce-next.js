"use client"

import { Product } from "@/types/Product"
import { useMemo } from "react"
import Card from "../Card"
import { useProducts } from "@/hooks/useProducts"

export default function TopSellingProductsCard() {



    const { data, isLoading, error } = useProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const products: Product[] = data?.data || []

    const randomProducts = useMemo(() => {
        return [...products].sort(() => 0.5 - Math.random()).slice(0, 4)
    }, [products])


    if (isLoading) return <p>Loading products...</p>
    if (error) return <p>Error loading products</p>




    return (
        <div className="flex flex-wrap gap-4 justify-center mt-3">
            {randomProducts.map((product) => (
                <Card product={product} key={product._id} />
            ))}
        </div>
    )
}
