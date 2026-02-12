import SkeletonCard from "./SkeletonCard";

export default function CategoriesSkeletonCarousel() {
    return (
        <div className="relative mt-6">
            {/* Left arrow placeholder */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 
                            w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

            <div className="overflow-hidden">
                <div className="flex gap-4 justify-center">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>

            {/* Right arrow placeholder */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 
                            w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        </div>
    )
}
