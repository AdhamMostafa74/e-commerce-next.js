"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
    Menu,
    ShoppingCart,
    X,
    Heart,
    LogOut,
} from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { FaSpinner } from "react-icons/fa"

import { useGetCart } from "@/hooks/useCart"
import CartOverlay from "./Cart Components/CartOverlay"
import { CgSpinner } from "react-icons/cg"

/* ---------------- Active underline ---------------- */
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
    const [cartOpen, setCartOpen] = useState(false)
    const [logoutOpen, setLogoutOpen] = useState(false)

    const { data, refetch } = useGetCart()
    const { status, data: userData } = useSession()

    console.log(userData)

    const isAuthenticated = status === "authenticated"

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`)

    const linkClass = (href: string) =>
        `relative pb-1 transition-colors ${isActive(href)
            ? "text-blue-500 font-semibold"
            : "text-gray-600 hover:text-blue-500"
        }`

    const navLinks = [
        { href: "/home", label: "HOME" },
        { href: "/products", label: "PRODUCTS" },
        isAuthenticated
            ? { href: "/profile", label: "PROFILE" }
            : { href: "/api/auth/signin", label: "LOGIN" },
    ]

    /* -------- Close logout modal on ESC -------- */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLogoutOpen(false)
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    return (
        <>
            {/* ================= Navbar ================= */}
            <nav className="w-full border-b shadow-sm sticky top-0 bg-white z-50">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold">
                        CARTY
                    </Link>

                    {/* -------- Desktop Menu -------- */}
                    <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
                        {status !== "loading" &&
                            navLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={linkClass(href)}>
                                        {label}
                                        <ActiveBar active={isActive(href)} />
                                    </Link>
                                </li>
                            ))}
                    </ul>

                    {/* -------- Right Actions (Desktop) -------- */}
                    <div className={`hidden lg:flex items-center gap-4 relative ${isAuthenticated ? 'block ' : 'invishible'}`}>
                        {/* Cart */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className={`relative text-gray-600 hover:text-blue-500 ${status != 'authenticated' ? `hidden` : `block`}`}
                        >
                            <ShoppingCart />
                            <span className="absolute -top-2 -right-3 min-w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                                {data?.numOfCartItems !== undefined ? (
                                    data.numOfCartItems
                                ) : (
                                    <FaSpinner className="w-3 h-3 animate-spin" />
                                )}
                            </span>
                        </button>

                        {/* Wishlist */}

                        <Link
                            href="/wishlist"
                            className="text-gray-600 hover:text-red-500 transition-colors"
                        >
                            <Heart className="hover:fill-red-500 transition-all" />
                        </Link>


                        {/* Logout */}

                        <button
                            onClick={() => setLogoutOpen(true)}
                            className="text-gray-600 hover:text-red-600 transition-colors"
                            title="Logout"
                        >
                            <LogOut />
                        </button>

                    </div>

                    {/* -------- Burger -------- */}
                    <button onClick={() => setOpen(true)} className="lg:hidden">
                        <Menu size={26} />
                    </button>
                </div>
            </nav>

            {/* ================= Mobile Overlay ================= */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* ================= Mobile Sidebar ================= */}
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
                    {status !== "loading" &&
                        [
                            ...navLinks,
                            { href: "/cart", label: "CART" },
                            ...(isAuthenticated
                                ? [{ href: "/wishlist", label: "WISHLIST" }]
                                : []),
                        ].map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    className={linkClass(href)}
                                >
                                    {label}
                                    <ActiveBar active={isActive(href)} />
                                </Link>
                            </li>
                        ))}

                    {/* Mobile Logout */}
                    {isAuthenticated && (
                        <li>
                            <button
                                onClick={() => setLogoutOpen(true)}
                                className="text-red-600 font-medium"
                            >
                                LOGOUT
                            </button>
                        </li>
                    )}
                </ul>
            </aside>

            {/* ================= Logout Confirm Modal ================= */}
            {logoutOpen && (
                <>
                    <div
                        onClick={() => setLogoutOpen(false)}
                        className="fixed inset-0 bg-black/40 z-50"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Confirm Logout
                            </h2>

                            <p className="text-sm text-gray-600 mt-2">
                                Are you sure you want to log out?
                            </p>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setLogoutOpen(false)}
                                    className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-200 transform transition-all duration-300 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}
                                    className="px-4 py-2 rounded-md bg-red-700 text-white  transform transition-all duration-300  hover:bg-red-300 cursor-pointer"

                                >
                                    {status == 'loading' ? <CgSpinner className=" animate-spin" /> : "Logout"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ================= Cart Overlay ================= */}
            <CartOverlay
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                cart={data!}
                refetechcart={refetch}
            />
        </>
    )
}
