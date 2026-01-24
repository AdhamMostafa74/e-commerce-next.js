'use client'

import { ChangeEvent } from "react"

type QuantityCounterProps = {
    quantity: number
    setQuantity: (value: number) => void
    stock: number
    min?: number
}

export default function QuantityCounter({
    quantity,
    setQuantity,
    stock,
    min = 1,
}: QuantityCounterProps) {

    const decrease = () => {
        if (quantity > min) setQuantity(quantity - 1)
    }

    const increase = () => {
        if (quantity < stock) setQuantity(quantity + 1)
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (Number.isNaN(value)) return

        if (value < min) setQuantity(min)
        else if (value > stock) setQuantity(stock)
        else setQuantity(value)
    }

    const outOfStock = stock <= 0

    return (
        <div className="flex items-center gap-6">
            {/* Label */}
            <span className="font-semibold text-lg text-gray-800">
                Quantity
            </span>

            {/* Counter */}
            <div className="flex items-center border-2 rounded-xl overflow-hidden">
                {/* − */}
                <button
                    onClick={decrease}
                    disabled={quantity <= min || outOfStock}
                    className="
            px-5 py-3
            text-2xl font-bold
            text-gray-700
            hover:bg-gray-100
            disabled:opacity-40
          "
                >
                    −
                </button>

                {/* Input */}
                <input
                    type="number"
                    min={min}
                    max={stock}
                    value={quantity}
                    onChange={handleInput}
                    disabled={outOfStock}
                    className="
            w-20
            py-3
            text-lg
            text-center
            outline-none
            border-x-2
            disabled:bg-gray-100
          "
                />

                {/* + */}
                <button
                    onClick={increase}
                    disabled={quantity >= stock || outOfStock}
                    className="
            px-5 py-3
            text-2xl font-bold
            text-gray-700
            hover:bg-gray-100
            disabled:opacity-40
          "
                >
                    +
                </button>
            </div>

            {/* Stock info */}
            {outOfStock ? (
                <span className="text-red-600 text-sm font-semibold">
                    Out of stock
                </span>
            ) : (
                <span className="text-gray-500 text-sm">
                    {stock} available
                </span>
            )}
        </div>
    )
}
