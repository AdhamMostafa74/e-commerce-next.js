"use client"


import Link from "next/link"
import { usePathname } from "next/navigation"



export default function Navbar() {
    const pathname = usePathname()



    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname === href || pathname.startsWith(`${href}/`)
    }

    return (
        <nav className="w-full border-b shadow-sm sticky top-0 bg-white z-50">
            <div className="container mx-auto px-6 py-2 flex items-center justify-between">

                <Link href="/" className="text-2xl font-bold ">
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
                    <li>
                        <Link
                            href="/products"
                            className={isActive("/products") ? "isActive" : "isNotActive"}
                        >
                            PRODUCTS
                        </Link>
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
