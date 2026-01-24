'use client'

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Data } from "@/interfaces/Product"

type ProductImageGalleryProps = Pick<
    Data,
    "imageCover" | "images"
> & {
    alt: string
}

export default function ProductImageGallery({
    imageCover,
    images,
    alt,
}: ProductImageGalleryProps) {
    const allImages = [imageCover, ...images]
    const [index, setIndex] = useState(0)
    const [zoom, setZoom] = useState(false)
    const [isFading, setIsFading] = useState(false)

    const changeImage = (newIndex: number) => {
        if (newIndex === index) return

        setIsFading(true)

        setTimeout(() => {
            setIndex(newIndex)
            setIsFading(false)
        }, 150)
    }

    const next = () =>
        changeImage((index + 1) % allImages.length)

    const prev = () =>
        changeImage((index - 1 + allImages.length) % allImages.length)

    return (
        <div className="w-full select-none border px-5 bg-slate-200 rounded-2xl py-5 m-5">
            {/* Main Image */}
            <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Image
                    src={allImages[index]}
                    alt={alt}
                    fill
                    onMouseEnter={() => setZoom(true)}
                    onMouseLeave={() => setZoom(false)}
                    className={`
            object-contain rounded-2xl
            transition-all duration-300
            ${zoom ? "scale-110" : "scale-100"}
            ${isFading ? "opacity-0" : "opacity-100"}
          `}
                    priority
                />

                {/*  Arrows */}
                <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                >
                    <ChevronLeft size={20} />
                </button>

                <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/*  Thumbnails */}
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 justify-center pt-3">
                {allImages.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => changeImage(i)}
                        className={`
              relative min-w-16 h-16 rounded-lg overflow-hidden
              transition
              ${index === i
                                ? "ring-2 ring-blue-500"
                                : "hover:ring-2 hover:ring-blue-500"}
            `}
                    >
                        <Image
                            src={img}
                            alt={`${alt}-${i}`}
                            fill
                            className="object-contain"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
