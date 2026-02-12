import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { CartProduct } from '@/interfaces/cart'

interface CartProductCardProps {
    item: CartProduct
    itemCount: number
    ChangeCount: (productId: string, itemCount: number) => void
    removeCartItem: (productId: string) => void
    productId: string
    PendingRemoval: boolean
}

export default function CartProductCard({
    item,
    itemCount,
    ChangeCount,
    removeCartItem,
    productId,
    PendingRemoval,
}: CartProductCardProps) {
    return (
        <div className="flex gap-4 items-center h-32 bg-white p-2 rounded-md shadow-lg pe-5">
            {/* Image */}
            <Image
                src={item.product.imageCover}
                alt={item.product.title}
                height={1000}
                width={1000}
                className="w-28 h-28 object-contain rounded border-e-2"
            />

            {/* Info */}
            <div className="flex-1">
                <h3 className="text-md font-medium">
                    {item.product.title.length > 30
                        ? item.product.title.slice(0, 30) + '...'
                        : item.product.title}
                </h3>
                <p className="text-md text-gray-500">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => ChangeCount(item.product._id, itemCount - 1)}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded-md disabled:bg-gray-300"
                    >
                        <Minus className="w-4 h-4" />
                    </button>

                    <span className="px-2 font-medium">{itemCount}</span>

                    <button
                        onClick={() => ChangeCount(item.product._id, itemCount + 1)}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded-md disabled:bg-gray-300"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Remove */}
            <button
                disabled={item.product._id === productId && PendingRemoval}
                onClick={() => removeCartItem(item.product._id)}
                className="text-black-400 hover:bg-red-500 bg-red-300 p-1 rounded-md disabled:bg-red-200"
            >
                {item.product._id === productId && PendingRemoval ? (
                    <CgSpinner className="animate-spin w-6 h-6" />
                ) : (
                    <X className="w-6 h-6" />
                )}
            </button>
        </div>
    )
}
