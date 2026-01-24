"use client"

import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"
import shippingImage from "@/assets/Free shipping-pana.svg"
import paymentImage from "@/assets/Online transactions-amico.svg"
import supportImage from "@/assets/Contact us-cuate.svg"


export default function Footer() {
    const footerItems = [
        {
            text: "Free Shipping",
            image: shippingImage,
        },
        {
            text: "Secure Payment",
            image: paymentImage,
        },
        {
            text: "24/7 Support",
            image: supportImage,
        },
    ]

    return (
        <footer className="w-full bg-slate-200 mt-20">
            {/* Top Section: Why Choose Us */}
            <div className="text-center py-6">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-6">
                    Why Choose Us?
                </h2>

                <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-6">
                    {footerItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center w-full lg:w-64 bg-white rounded-xl p-4 shadow-md"
                        >
                            <div className="w-full h-32 flex items-center justify-center">
                                <Image src={item.image} alt={item.text} className="object-contain h-full w-full" />
                            </div>
                            <div className="w-full border-t border-gray-300 my-2" />
                            <span className="text-gray-700 font-semibold text-center">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 mt-8"></div>

            {/* Bottom Section */}
            <div className="container mx-auto p-6 relative flex flex-col md:flex-row items-center gap-6">

                {/* Left */}
                <span className="text-gray-600 text-sm md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2">
                    Carty by Adham Mostafa. All rights reserved. &copy; {new Date().getFullYear()}
                </span>

                {/* Center  */}
                <div className="flex gap-6 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <Link href="https://www.facebook.com/adham.mostafa.372" target="_blank" className="text-blue-600 hover:text-blue-800 transition-colors">
                        <FaFacebookF size={24} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/adham-mostafa-845a91293/" target="_blank" className="text-blue-700 hover:text-blue-900 transition-colors">
                        <FaLinkedinIn size={24} />
                    </Link>
                    <Link href="https://github.com/AdhamMostafa74/" target="_blank" className="text-gray-800 hover:text-gray-900 transition-colors">
                        <FaGithub size={24} />
                    </Link>
                </div>

                {/* Right */}
                <div className="flex gap-4 md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2">
                    <Link href="#" className="text-gray-700 hover:text-blue-500 transition-colors text-sm">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-blue-500 transition-colors text-sm">
                        Terms of Service
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-blue-500 transition-colors text-sm">
                        Contact Us
                    </Link>
                </div>

            </div>

        </footer>
    )
}
