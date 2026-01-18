"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface Category {
    _id: string
    name: string
}

export default function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const { data } = useQuery({
        queryKey: ["getCategories"],
        queryFn: async () => {
            const res = await fetch(
                "https://ecommerce.routemisr.com/api/v1/categories"
            )
            return res.json()
        },
    })

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname === href || pathname.startsWith(`${href}/`)
    }

    return (
        <nav className="w-full border-b shadow-sm sticky top-0 bg-white z-50">
            <div className="container mx-auto px-6 py-2 flex items-center justify-between">

                <Link href="/" className="text-2xl font-bold text-blue-500">
                    CARTY
                </Link>

                <ul className="flex items-center gap-4 text-sm font-medium">

                    <li>
                        <Link
                            href="/home"
                            className={isActive("/home") ? "isActive" : "isNotActive"}
                        >
                            HOME
                        </Link>
                    </li>

                    <li className="relative">
                        <button
                            className={isActive("/category") ? "isActive" : "isNotActive"}
                            onMouseEnter={() => setOpen(true)}
                        >
                            CATEGORIES
                        </button>

                        {open && (
                            <div
                                className="absolute top-full mt-2 w-48 bg-white border rounded shadow-md"
                                onMouseLeave={() => setOpen(false)}
                            >
                                {data?.data?.map((category: Category) => (
                                    <Link
                                        key={category._id}
                                        href={`/category/${category.name}`}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>

                    <li>
                        <Link
                            href="/profile"
                            className={isActive("/profile") ? "isActive" : "isNotActive"}
                        >
                            PROFILE
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/cart"
                            className={isActive("/cart") ? "isActive" : "isNotActive"}
                        >
                            CART
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}
