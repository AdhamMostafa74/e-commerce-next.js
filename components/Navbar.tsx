"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface Category {
    _id: string
    name: string
}

export default function Navbar() {
    const pathname = usePathname()
    const [categories, setCategories] = useState<Category[]>([])
    const [open, setOpen] = useState(false)




    useEffect(() => {
        async function getCategories() {
            setCategories([
                { _id: "1", name: "Electronics" },
                { _id: "2", name: "Fashion" },
                { _id: "3", name: "Books" },
            ])
        }

        getCategories()
    }, [])

    // 🔹 Active link helper
    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href) || pathname.endsWith(href)
    }



    return (
        <nav className="w-full border-b shadow-sm top-0 sticky bg-white ">
            <div className="container mx-auto px-6 py-2 flex items-center justify-between">

                {/* LOGO */}
                <Link
                    href={'/'}
                    className="text-2xl font-bold text-blue-500 cursor-pointer">
                    CARTY
                </Link>

                {/* NAV LINKS */}
                <ul className="flex items-center gap-4 text-sm font-medium">

                    <li>
                        <Link
                            href="/home"
                            className={isActive("/home") ? 'isActive' : 'isNotActive'}
                        >
                            HOME
                        </Link>
                    </li>

                    {/* CATEGORIES */}
                    <li className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            onMouseEnter={() => setOpen(true)}

                        >
                            CATEGORIES
                        </button>

                        {open && (
                            <div
                                className="absolute top-full mt-2 w-48 bg-white border rounded shadow-md"
                                onMouseLeave={() => setOpen(false)}
                            >
                                {categories.map((category) => (
                                    <Link
                                        key={category._id}
                                        href={`/category/${category.name}`}
                                        className={`block my-2 py-6 text-black px-4 hover:bg-muted ${isActive(`/${category.name}`) ? 'isActive' : 'isNotActive'}`}
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
                            className={isActive("/profile") ? 'isActive' : 'isNotActive'}
                        >
                            PROFILE
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/cart"
                            className={isActive("/cart") ? 'isActive' : 'isNotActive'}
                        >
                            CART
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}
