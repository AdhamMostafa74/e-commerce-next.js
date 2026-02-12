"use client"

import Card from '@/components/Card'
import Sidebar from '@/components/Products Components/sidebar'
import { useProducts } from '@/hooks/useProducts'
import { Product } from '@/interfaces/Product'
import React, { useState } from 'react'

export default function Page() {

    // states

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(4000)

    // product calling

    const { data, isLoading } = useProducts()

    // Filter products by price range

    const filteredProducts: Product[] = data?.data?.filter((product: Product) => {
        return product.price >= minPrice && product.price <= maxPrice
    }) || []

    return (
        <div className='flex justify-center sm:flex-row'>

            {/* Sidebar */}

            <div className='p-6'>
                <Sidebar
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                />
            </div>

            {/* Products */}

            <div className="
                       bg-slate-200 m-6 rounded-t-2xl
                      grid grid-cols-3  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 
                      gap-6 p-10">
                {isLoading ? (
                    <div>Loading...</div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product: Product) => (
                        <Card key={product._id}
                            product={product}
                        />
                    ))
                ) : (
                    <div>No products found in this range.</div>
                )}
            </div>

        </div>
    )
}
