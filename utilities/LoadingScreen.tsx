'use client'

import { useEffect, useState } from "react"

const tips = [
    "💡 Tip: You can swipe between product tabs on mobile",
    "🛒 Tip: Add items to your cart before stock runs out",
    "⚡ Tip: Filters help you find products faster",
    "🔍 Tip: Zoom images to see product details",
    "⭐ Tip: Check reviews before purchasing",
]

export default function LoadingScreen() {
    const [tipIndex, setTipIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % tips.length)
        }, 2500)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {/* 🔥 Animations (GLOBAL, NOT PURGED) */}
            <style jsx global>{`
        @keyframes dotBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }

        @keyframes tipSlide {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
                {/* 🔵 Bouncing dots */}
                <div className="flex items-end gap-4 h-20">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            style={{
                                width: 16,
                                height: 16,
                                backgroundColor: "#3b82f6", // blue-500
                                borderRadius: "9999px",
                                animation: `dotBounce 0.8s ${i * 0.15}s infinite ease-in-out`,
                            }}
                        />
                    ))}
                </div>

                {/* 💬 Sliding tips */}
                <div className="mt-6  overflow-hidden">
                    <p
                        key={tipIndex}
                        style={{
                            animation: "tipSlide 0.4s ease-out",
                        }}
                        className="text-gray-600 text-2xl"
                    >
                        {tips[tipIndex]}
                    </p>
                </div>
            </div>
        </>
    )
}
