"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import shippingImage from "@/assets/shipping2.png"
import paymentImage from "@/assets/payment.jpg"
import supportImage from "@/assets/support.jpg"

export default function Footer() {
    const footerItems = [
        {
            text: "Free Shipping",
            image: shippingImage,
            height: 300,
            width: 200,
        },
        {
            text: "Secure Payment",
            image: paymentImage,
            height: 400,
            width: 400,
        },
        {
            text: "24/7 Support",
            image: supportImage,
            height: 400,
            width: 400,
        },
    ]

    return (
        <footer className="w-full mt-20">
            <h2 className="text-center text-2xl md:text-3xl font-bold text-blue-500 py-3 mb-6">
                Why Choose Us?
            </h2>

            <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-6">
                {footerItems.map((item, idx) => (
                    <Card
                        key={idx}
                        className="
              flex flex-col items-center
              w-1/2 xl:w-auto
              mx-auto
            "
                    >
                        {/* Image */}
                        <div className="w-full h-40 flex items-center justify-center">
                            <Image
                                src={item.image}
                                alt={item.text}
                                width={item.width}
                                height={item.height}
                                className="object-contain"
                            />
                        </div>

                        {/* Divider */}
                        <div className="w-full border-t border-gray-300" />

                        {/* Text */}
                        <CardContent className="text-center py-3">
                            <span className="font-semibold text-gray-700">
                                {item.text}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </footer>
    )
}
