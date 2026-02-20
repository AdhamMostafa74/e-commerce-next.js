'use client'

import ProductImageGallery from '@/components/Products Components/ProductImageGallery'
import { useSignleProduct } from '@/hooks/useSingleProduct'
import { ProductDetails as PD } from '@/types/Product'
import AddToCartButton from '@/utilities/AddToCartButton'
import Breadcrumb from '@/utilities/BreadCrumb'
import LoadingScreen from '@/utilities/LoadingScreen'
import ProductTabs from '@/components/Products Components/ProductTabs'
import QuantityCounter from '@/utilities/QuantityCounter'
import { Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function ProductDetails() {
    const { productid } = useParams()

    const { data, isLoading } = useSignleProduct(productid) as {
        data: PD
        isLoading: boolean
    }

    const [quantity, setQuantity] = useState(1)

    if (isLoading) return <LoadingScreen />

    return (
        <div className="px-4 md:px-0">
            <Breadcrumb
                brand={data.data.brand}
                category={data.data.category}
                title={data.data.title}
            />

            {/* Layout */}
            <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-0">
                {/* 🖼 Image */}
                <div className="relative w-full md:w-1/3 flex justify-center md:justify-start">
                    <ProductImageGallery
                        alt={data.data.title}
                        imageCover={data.data.imageCover}
                        images={data.data.images}
                    />
                </div>

                {/* 📦 Details */}
                <div className="w-full md:w-2/3 flex flex-col p-0 md:p-6 md:ps-12">
                    {/* Title / Rating / Price */}
                    <div className="border-b-2 w-full flex flex-col gap-4 pb-6">
                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                            <span className="text-2xl md:text-4xl">
                                {data.data.title}
                            </span>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={22}
                                        fill={
                                            i <
                                                Math.round(
                                                    data.data.ratingsAverage || 0
                                                )
                                                ? '#F59E0B'
                                                : 'none'
                                        }
                                        stroke={
                                            i <
                                                Math.round(
                                                    data.data.ratingsAverage || 0
                                                )
                                                ? '#F59E0B'
                                                : '#D1D5DB'
                                        }
                                    />
                                ))}
                                <span className="text-gray-500 font-medium text-lg">
                                    {data.data.ratingsQuantity}
                                </span>
                            </div>
                        </div>

                        <span className="text-3xl md:text-4xl italic font-bold text-blue-500">
                            {data.data.price}.00$
                        </span>
                    </div>

                    {/* Description */}
                    <div className="py-6">
                        <span className="text-lg md:text-2xl text-gray-500">
                            {data.data.description}
                        </span>
                    </div>

                    {/* Quantity */}
                    <QuantityCounter
                        quantity={quantity}
                        setQuantity={setQuantity}
                        stock={data.data.quantity}
                    />

                    {/* Add to cart */}
                    <div className="w-full md:w-1/2 md:pe-12 mt-4">
                        <AddToCartButton productId={data.data._id} />
                    </div>

                    {/* Tabs */}
                    <div className="mt-6">
                        <ProductTabs
                            isLoading={isLoading}
                            description={data.data.description}
                            reviews={data.data.reviews}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}