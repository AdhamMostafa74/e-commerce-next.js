"use client"

import { useCategories } from "@/hooks/useCategories"
import Card from "../Card"
import { Category } from "@/types/Product"
import { useEffect, useRef, useState } from "react"
import CategoriesSkeletonCarousel from "@/utilities/CategorySkeleton"

export default function CategoriesCarousel() {
    /* =======================
       Data
    ======================== */
    const { data, isLoading, error } = useCategories()
    const categories: Category[] = data?.data || []

    /* =======================
       State
    ======================== */
    const [visibleCount, setVisibleCount] = useState(4)
    const [cardWidth, setCardWidth] = useState(260)
    const [index, setIndex] = useState(4)
    const [transition, setTransition] = useState(true)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    /* =======================
       Responsive logic
    ======================== */
    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 768) {
                // mobile
                setVisibleCount(1)
                setCardWidth(220)
            } else if (window.innerWidth < 1024) {
                // md
                setVisibleCount(3)
                setCardWidth(240)
            } else {
                // lg
                setVisibleCount(4)
                setCardWidth(260)
            }
        }

        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    /* =======================
       Reset index on layout change
    ======================== */
    useEffect(() => {
        setIndex(visibleCount)
    }, [visibleCount])

    /* =======================
       Infinite setup
    ======================== */
    const extended = [
        ...categories.slice(-visibleCount),
        ...categories,
        ...categories.slice(0, visibleCount),
    ]

    /* =======================
       Navigation
    ======================== */
    const next = () => setIndex((i) => i + 1)
    const prev = () => setIndex((i) => i - 1)

    /* =======================
       Auto play
    ======================== */
    const startAutoPlay = () => {
        stopAutoPlay()
        intervalRef.current = setInterval(next, 3000)
    }

    const stopAutoPlay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
    }

    useEffect(() => {
        startAutoPlay()
        return stopAutoPlay
    }, [visibleCount])

    /* =======================
       Loop correction
    ======================== */
    useEffect(() => {
        if (!categories.length) return

        if (index >= categories.length + visibleCount) {
            setTimeout(() => {
                setTransition(false)
                setIndex(visibleCount)
            }, 300)
        }

        if (index <= 0) {
            setTimeout(() => {
                setTransition(false)
                setIndex(categories.length)
            }, 300)
        }

        const t = setTimeout(() => setTransition(true), 50)
        return () => clearTimeout(t)
    }, [index, categories.length, visibleCount])

    /* =======================
       Loading / Error
    ======================== */
    if (isLoading) return <CategoriesSkeletonCarousel />
    if (error) return <p>Error loading categories</p>

    /* =======================
       Render
    ======================== */
    return (
        <div
            className="relative my-6 md:w-xl lg:w-3xl xl:w-5xl mx-auto"
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
        >
            {/* Left Arrow (hidden on mobile) */}
            <button
                onClick={prev}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                           bg-white shadow rounded-full w-10 h-10
                           items-center justify-center"
            >
                ◀
            </button>

            {/* Carousel */}
            <div className="overflow-hidden py-5 px-4 sm:px-8 lg:px-4">
                <div
                    className={`flex gap-2 ${transition ? "transition-transform duration-300" : ""
                        }`}
                    style={{
                        transform: `translateX(-${index * cardWidth}px)`,
                    }}
                >
                    {extended.map((cat, i) => (
                        <div
                            key={`${cat._id}-${i}`}
                            className="shrink-0"
                            style={{ width: `${cardWidth}px` }}
                        >
                            <Card category={cat} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Arrow */}
            <button
                onClick={next}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                           bg-white shadow rounded-full w-10 h-10
                           items-center justify-center"
            >
                ▶
            </button>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                {categories.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i + visibleCount)}
                        className={`w-2 h-2 rounded-full ${index - visibleCount === i
                            ? "bg-black"
                            : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
