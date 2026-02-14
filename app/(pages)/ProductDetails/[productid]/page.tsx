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
        data: PD;
        isLoading: boolean
    }
    const [quantity, setQuantity] = useState(1)




    return (
        <div>
            {
                isLoading ? <LoadingScreen />
                    : <div>
                        <Breadcrumb
                            brand={data.data.brand}
                            category={data.data.category}
                            title={data.data.title}
                        />

                        <div className='flex justify-between '>
                            {/* Image */}
                            <div className="relative  w-1/3  flex items-start">
                                <ProductImageGallery
                                    alt={data.data.title}
                                    imageCover={data.data.imageCover}
                                    images={data.data.images}
                                />
                            </div>

                            <div className='w-2/3 flex  p-6 ps-12 flex-col'>
                                <div className='border-b-2 w-full flex flex-col gap-2 pb-6 '>
                                    <div className='flex justify-between '>
                                        <span className='text-4xl'>{data.data.title}</span>
                                        <div className="flex justify-center gap-2">
                                            <div className="flex justify-center items-center gap-1 mt-2">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={24}
                                                        fill={i < Math.round(data.data.ratingsAverage || 0) ? "#F59E0B" : "none"} // gold or empty
                                                        stroke={i < Math.round(data.data.ratingsAverage || 0) ? "#F59E0B" : "#D1D5DB"} // stroke color
                                                    />
                                                ))}
                                                <span className="text-gray-500 font-medium block text-2xl  ">
                                                    {data.data.ratingsQuantity}
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <span className='text-4xl italic font-bold text-blue-500'> {data.data.price}.00$</span>
                                </div>
                                <div className=' flex p-6 ps-0 '>
                                    <span className='text-2xl text-gray-500 border-b pb-6'> {data.data.description}</span>

                                </div>
                                <QuantityCounter
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    stock={data.data.quantity}
                                />
                                <div className='w-1/2 pe-12  '>
                                    <AddToCartButton productId={data.data._id} />

                                </div>
                                <ProductTabs
                                    isLoading={isLoading}
                                    description={data.data.description}
                                    reviews={data.data.reviews}
                                />
                            </div>

                        </div>
                    </div>

            }
        </div>

    )
}
