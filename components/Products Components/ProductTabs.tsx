'use client'

import { useRef, useState } from "react"
import ReviewsSkeleton from "../../utilities/ReviewsSkeleton"
import { Review } from "@/types/Product"
import { Star } from "lucide-react"

type ProductTabsProps = {
    description: string
    reviews: Review[]
    isLoading: boolean

}

export default function ProductTabs({
    description,
    reviews,
    isLoading,

}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')
    const [reviewsLoaded, setReviewsLoaded] = useState(false)



    return (
        <div
            className="w-full border-t mt-6"

        >
            {/* 🧭 Tabs Header */}
            <div className="relative border-b flex">
                <button
                    onClick={() => setActiveTab('description')}
                    className="px-6 py-3 font-medium text-gray-600 hover:text-blue-500"
                >
                    Description
                </button>

                <button
                    onClick={() => {
                        setActiveTab('reviews')
                        setReviewsLoaded(true)
                    }}
                    className="px-6 py-3 font-medium text-gray-600 hover:text-blue-500 flex items-center gap-2"
                >
                    Customer Reviews

                </button>

                {/* 🟦 Animated underline */}
                <span
                    className={`
            absolute bottom-0 h-0.5 bg-blue-500
            transition-all duration-300 ease-in-out
            ${activeTab === 'description'
                            ? 'left-0 w-35'
                            : 'left-35 w-47.5'}
          `}
                />
            </div>

            {/* 📦 Content */}
            <div className="relative overflow-hidden min-h-35">
                {/* Description */}
                <div
                    className={`
            transition-all duration-300 ease-in-out
            ${activeTab === 'description'
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-4 absolute'}
          `}
                >
                    <p className="text-gray-700 leading-relaxed py-4">
                        {description}
                    </p>
                </div>

                {/* Reviews */}

                <div
                    className={`
            transition-all duration-300 ease-in-out
            ${activeTab === 'reviews'
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-4 absolute'}
          `}
                >
                    <div className="py-4">
                        {reviews.length === 0
                            ? <div>No Reviews Yet</div>
                            : isLoading
                                ? <ReviewsSkeleton />
                                : reviews.map((review) => (
                                    <div key={review._id} className="flex justify-between  flex-col gap-2 p-3">

                                        <div className="w-full xl:w-1/2 flex justify-between items-center gap-1 mt-2">
                                            <span className="text-2xl italic pe-6">{review.user.name}</span>

                                            <div className="flex">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={24}
                                                        fill={i < Math.round(review.rating || 0) ? "#F59E0B" : "none"} // gold or empty
                                                        stroke={i < Math.round(review.rating || 0) ? "#F59E0B" : "#D1D5DB"} // stroke color
                                                    />
                                                ))}
                                            </div>

                                        </div>


                                        <span className="text-sm text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>

                                        <p className="text-gray-800">
                                            {review.review}
                                        </p>
                                    </div>

                                ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
