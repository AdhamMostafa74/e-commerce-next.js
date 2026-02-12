"use client"

import { FaShoppingCart } from "react-icons/fa";
import { useAddToCard, useGetCart } from "@/hooks/useCart";
import { CgSpinner } from "react-icons/cg";


interface AddtoCartProps {

    productId: string;
}


export default function AddToCartButton({ productId }: AddtoCartProps) {
    useGetCart();

    const { mutate, isPending } = useAddToCard()

    const handleClick = () => {

        mutate(productId);

    };
    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="
        flex items-center justify-center gap-2
        bg-blue-500 hover:bg-blue-600
        text-white font-medium w-full
        px-5 py-2.5 rounded-md  my-3
        transition-colors disabled:bg-blue-700
      "
        >
            {isPending ? <div className="flex items-center gap-2">
                <CgSpinner className="animate-spin" />
                <span>Adding...</span>
            </div> : <div className="flex items-center gap-2">
                <FaShoppingCart size={14} />
                <span>Add To Cart</span></div>}
        </button>
    );
}
