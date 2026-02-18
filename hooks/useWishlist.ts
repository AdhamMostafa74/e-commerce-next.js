

"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Product } from "@/types/Product"
import { baseUrl } from "./api"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"




export function useWishlist() {
    const { data } = useSession()

    const query = useQuery({
        queryKey: ["getWishlist"],
        queryFn: async () => {
            const res = await fetch(baseUrl + "Wishlist", {
                headers: {
                    token: data!.accessToken
                },

            })

            if (!res.ok) {
                throw new Error("Failed to fetch Wishlist")
            }

            return res.json()
        },
    })

    return query
}
export function useAddWishlist() {
    const { data } = useSession()

    const query = useMutation({
        mutationKey: ["addWishlist"],
        mutationFn: async (productId: string) => {
            const res = await fetch(baseUrl + "Wishlist", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    token: data!.accessToken
                },
                body: JSON.stringify({ productId })
            })

            if (!res.ok) {
                throw new Error("Failed to add item to Wishlist")
            }

            return res.json()
        },
        onSuccess: () => {
            toast.success('Item added to wishlist!')

        },
        onError: () => {
            toast.error('An error occurred!')

        },

    })

    return query
}

export function useRemoveWishlist() {
    const queryClient = useQueryClient()

    const { data } = useSession()

    const query = useMutation({
        mutationKey: ["removeWishlist"],
        mutationFn: async (productId: string) => {

            const res = await fetch(baseUrl + "Wishlist/" + productId, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    token: data!.accessToken
                }

            })

            if (!res.ok) {
                throw new Error("Failed to remove item from Wishlist")
            }

            return res.json()
        },
        onSuccess: () => {

            toast.success('Item removed from wishlist!')
            queryClient.invalidateQueries({
                queryKey: ["getWishlist"]
            })
        },
        onError: () => {
            toast.error('An error occurred!')

        },

    })

    return query
}

