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
    const [dragOffset, setDragOffset] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    /* =======================
       Drag state
    ======================== */
    const isDragging = useRef(false)
    const startX = useRef(0)
    const currentTranslate = useRef(0)

    /* =======================
       Responsive logic
    ======================== */
    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 768) {
                setVisibleCount(1)
                setCardWidth(220)
            } else if (window.innerWidth < 1024) {
                setVisibleCount(3)
                setCardWidth(240)
            } else {
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
        intervalRef.current = setInterval(next, 2000)
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
       Drag handlers (shadcn-like)
    ======================== */
    const onPointerDown = (e: React.PointerEvent) => {
        isDragging.current = true
        startX.current = e.clientX
        setDragOffset(0)
        setTransition(false)
        stopAutoPlay()
    }

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return
        setDragOffset(e.clientX - startX.current)
    }

    const onPointerUp = () => {
        if (!isDragging.current) return

        isDragging.current = false
        setTransition(true)

        const movedCards = Math.round(dragOffset / cardWidth)

        if (movedCards !== 0) {
            setIndex((i) => i - movedCards)
        }

        setDragOffset(0)
        startAutoPlay()
    }
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
            className="relative  w-3/4 my-6 md:w-xl lg:w-3xl xl:w-5xl mx-auto"
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
        >
            {/* Left Arrow */}
            <button
                onClick={prev}
                className=" md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10
                           bg-white shadow rounded-full w-10 h-10
                           items-center justify-center"
            >
                ◀
            </button>

            {/* Carousel */}
            <div
                className="overflow-hidden py-5 px-4 sm:px-8 lg:px-4 cursor-grab active:cursor-grabbing"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
            >
                <div
                    className={`flex gap-2 ${transition ? "transition-transform duration-300" : ""}`}
                    style={{
                        transform: `translateX(-${index * cardWidth - dragOffset}px)`,
                    }}
                >
                    {extended.map((cat, i) => (
                        <div
                            key={`${cat._id}-${i}`}
                            className="shrink-0 select-none"
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
                className=" md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10
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
                        className={`w-2 h-2 rounded-full ${index - visibleCount === i ? "bg-black" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}