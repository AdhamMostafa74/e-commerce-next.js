"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const ActiveBar = ({ active }: { active: boolean }) => (
    <span
        className={`
        absolute left-0 -bottom-0.5 h-0.5 bg-blue-500 transition-all duration-300
        ${active ? "w-full opacity-100" : "w-0 opacity-0"}
      `}
    />
)

export default function Navbar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const cartCount = 2 // 🔴 replace with real cart state later

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`)

    const linkClass = (href: string) =>
        `relative pb-1 transition-colors ${isActive(href)
            ? "text-blue-500 font-semibold"
            : "text-gray-600 hover:text-blue-500"
        }`

    return (
        <>
            {/* Navbar */}
            <nav className="w-full border-b shadow-sm sticky top-0 bg-white z-50">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">
                        CARTY
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
                        {["/home", "/products", "/profile"].map((path) => (
                            <li key={path}>
                                <Link href={path} className={linkClass(path)}>
                                    {path.replace("/", "").toUpperCase()}
                                    <ActiveBar active={isActive(path)} />
                                </Link>
                            </li>
                        ))}

                        {/* Cart with badge */}
                        <li>
                            <Link href="/cart" className={linkClass("/cart")}>
                                CART
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                                <ActiveBar active={isActive("/cart")} />
                            </Link>
                        </li>
                    </ul>

                    {/* Burger */}
                    <button onClick={() => setOpen(true)} className="lg:hidden">
                        <Menu size={26} />
                    </button>
                </div>
            </nav>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`
          fixed top-0 right-0 h-full w-72 bg-white z-50
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={() => setOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                <ul className="flex flex-col gap-5 px-6 py-6 text-sm font-medium">
                    {["/home", "/products", "/profile", "/cart"].map((path) => (
                        <li key={path}>
                            <Link
                                onClick={() => setOpen(false)}
                                href={path}
                                className={linkClass(path)}
                            >
                                {path.replace("/", "").toUpperCase()}
                                <ActiveBar active={isActive(path)} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    )
}
