"use client"

import { Cart } from "@/types/cart"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { baseUrl } from "./api"
import { useSession } from "next-auth/react"



export function useAddToCard() {
    const queryClient = useQueryClient()
    const { data } = useSession()

    const query = useMutation({

        mutationKey: ["addToCart"],
        mutationFn: async (prodId: string) => {
            const res = await fetch(baseUrl + "cart", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    token: data!.accessToken
                },
                body: JSON.stringify({ productId: prodId })
            })

            if (!res.ok) {
                throw new Error("Failed to add item to cart")
            }
            queryClient.invalidateQueries({
                queryKey: ["getCart"],
            })
            return res.json()
        },
        onSuccess: () => {
            toast.success("Item added to cart!");

        },
        onError: (e) => {
            console.log(e)
        }
    })

    return query
}


export function useGetCart() {
    const { data } = useSession()

    const query = useQuery<Cart>({
        queryKey: ["getCart"],
        queryFn: async () => {
            const res = await fetch(baseUrl + "cart", {
                method: 'get',
                headers: {
                    token: data!.accessToken
                },
            })

            if (!res.ok) {
                throw new Error("Failed to get cart items")
            }

            return res.json()
        },
    })

    return query
}


export function useRemoveCartItem(prodId: string) {
    const queryClient = useQueryClient()
    const { data } = useSession()

    const query = useMutation<Cart>({
        mutationKey: ["removeCartItem"],
        mutationFn: async () => {
            const res = await fetch(baseUrl + "cart/" + prodId, {
                method: 'delete',
                headers: {
                    token: data!.accessToken
                },
            })

            if (!res.ok) {
                throw new Error("Failed to remove cart items")
            }
            queryClient.invalidateQueries({
                queryKey: ["getCart"],
            })
            return res.json()
        },
        onSuccess: () => {

            toast.success("Item removed from cart!");

        },
        onError: (e) => {
            console.log(e)
        }
    })

    return query
}


export function useClearCart() {
    const queryClient = useQueryClient()
    const { data } = useSession()

    const query = useMutation({
        mutationKey: ["clearCart"],
        mutationFn: async () => {
            const res = await fetch(baseUrl + "cart", {
                method: "delete",
                headers: {
                    token: data!.accessToken
                }
            })
            if (!res.ok) {
                throw new Error("Failed to clear cart items")
            }
            queryClient.invalidateQueries({
                queryKey: ["getCart"],
            })
            return res.json()
        },
        onSuccess: () => {

            toast.success("Cart cleared successfully!");

        },
        onError: (e) => {
            console.log(e)
        }
    })

    return query
}

export function useChangeItemQuantity() {
    const queryClient = useQueryClient()
    const { data } = useSession()

    return useMutation({
        mutationKey: ["changeItemQuantity"],

        mutationFn: async ({ prodId, itemCount }: { prodId: string; itemCount: number }) => {
            const res = await fetch(baseUrl + "cart/" + prodId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: data!.accessToken

                },
                body: JSON.stringify({ count: itemCount }),
            })

            if (!res.ok) {
                throw new Error("Failed to change item quantity")
            }

            return res.json()
        },

        onMutate: async ({ prodId, itemCount }) => {
            await queryClient.cancelQueries({ queryKey: ["getCart"] })

            const previousCart = queryClient.getQueryData<Cart>(["getCart"])

            queryClient.setQueryData<Cart>(["getCart"], (old) => {
                if (!old) return old

                return {
                    ...old,
                    data: {
                        ...old.data,
                        products: old.data.products.map((item) =>
                            item.product._id === prodId
                                ? { ...item, count: itemCount }
                                : item
                        ),
                    },
                }
            })

            return { previousCart }
        },

        onError: (error, variables, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(["getCart"], context.previousCart)
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCart"] })
        },
    })
}
