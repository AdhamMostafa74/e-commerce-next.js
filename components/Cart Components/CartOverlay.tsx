// components/CartOverlay.tsx
"use client"

import { useChangeItemQuantity, useClearCart, useRemoveCartItem } from "@/hooks/useCart"
import { Cart } from "@/types/cart"
import { X, ShoppingCart, Trash2 } from "lucide-react"
import CartProductCard from '@/components/Cart Components/CartProductCard'
import { useState } from "react"
import { CgSpinner } from "react-icons/cg"
import { useRouter } from "next/navigation"

interface CartOverlayProps {
    isOpen: boolean
    onClose: () => void
    cart: Cart | null
    refetechcart: () => void
}

export default function CartOverlay({
    isOpen,
    onClose,
    cart,
}: CartOverlayProps) {


    const [productId, setProductId] = useState('')
    const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>()
    const [itemCountState, setItemCountState] = useState(1)

    const { mutate: deleteCartItem, isPending: PendingRemoval } = useRemoveCartItem(productId)
    const { mutate: clearCart, isPending: pendingClearCart } = useClearCart()
    const { mutate: changeItemQuantity } = useChangeItemQuantity()

    const router = useRouter()

    function handleCheckOut() {
        onClose()
        router.push('/checkout')
        console.log(cart?.numOfCartItems)
    }


    function removeCartItem(productId: string) {
        setProductId(productId)
        deleteCartItem()
    }


    function ChangeCount(productId: string, itemCount: number) {
        setProductId(productId)
        setItemCountState(itemCount)

        if (itemCount < 0) return;

        clearTimeout(timeOutId)

        const id = setTimeout(() => {
            changeItemQuantity({ prodId: productId, itemCount: itemCount })

        }, 1000)
        setTimeOutId(id)
    }



    return (
        <>
            {
                <div>
                    {/* Dark background */}
                    <div
                        onClick={onClose}
                        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out 
                        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} />
                    {/* Right-side overlay */}
                    <aside className={`fixed top-0 right-0 h-full w-full sm:w-105  bg-slate-200  
                  z-50 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300  `}>
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">
                                Your Cart ({cart?.numOfCartItems ?? 0})
                            </h2>

                            <div className="flex items-center gap-2">

                                {/* Close */}
                                <button onClick={onClose}>
                                    <X className="w-5 h-5 text-gray-600 hover:text-black" />
                                </button>
                            </div>
                        </div>


                        {/* Products */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {cart?.data.products.map((item) => (
                                <CartProductCard
                                    key={item._id}
                                    item={item}
                                    itemCount={item.count}
                                    ChangeCount={ChangeCount}
                                    removeCartItem={removeCartItem}
                                    productId={productId}
                                    PendingRemoval={PendingRemoval}
                                />
                            ))}
                        </div>

                        {/* Order Summary */}

                        <div className="border-t p-4 space-y-4 flex flex-col justify-end">
                            <div className="flex  justify-end">
                                <button
                                    disabled={pendingClearCart || (cart?.numOfCartItems ?? 0) === 0}
                                    onClick={() => clearCart()}
                                    className="bg-red-300 hover:bg-red-500 p-2 rounded-md transition-colors
                             flex gap-2 items-center w-1/3 justify-center disabled:bg-red-200"
                                >
                                    {
                                        pendingClearCart ? <CgSpinner className="animate-spin" /> : <Trash2 className="w-5 h-5 text-black" />

                                    }
                                    Clear cart
                                </button>
                            </div>
                            <div className="flex justify-between font-medium text-md">
                                <span>Total</span>
                                <span>
                                    EGP {cart?.data.totalCartPrice.toFixed(2) ?? "0.00"}
                                </span>
                            </div>

                            {/* Checkout */}
                            <button
                                onClick={handleCheckOut}
                                disabled={cart?.numOfCartItems === 0}
                                className={`w-full flex items-center justify-center gap-2
                                 bg-blue-500 hover:bg-blue-300 disabled:bg-blue-300
                                 text-white py-3 rounded-mdtransition-all duration-200hover:scale-[1.02]`}>
                                <ShoppingCart className="w-5 h-5" />
                                Checkout
                            </button>
                        </div>
                    </aside>
                </div>
            }
        </>
    )
}
