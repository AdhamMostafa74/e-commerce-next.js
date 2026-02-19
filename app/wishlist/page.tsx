"use client"

import Card from '@/components/Card'
import { useWishlist } from '@/hooks/useWishlist'
import { Product } from '@/types/Product'
import React from 'react'

export default function Wishlist() {



    const { data, isLoading } = useWishlist()
    console.log(data)


    return (
        <div className={`flex justify-center sm:flex-row ${data?.data.length == 0 && 'h-[40vh]'}`}>



            {/* Products */}

            <div className="
                       bg-slate-200 m-6 rounded-2xl
                      grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 
                      gap-6 p-10">
                {isLoading ?
                    <div>Loading...</div>

                    :
                    data?.data?.length === 0 ?
                        <div className="col-span-full w-6xl flex items-center justify-center">
                            <div className=" px-6 py-4 rounded-xl text-center">
                                Add items to your wishlist!
                            </div>
                        </div>

                        : data?.data?.map((product: Product) => (
                            <Card key={product._id}
                                product={product}
                                wishlist={true}
                            />
                        ))

                }

            </div>

        </div>
    )
}
