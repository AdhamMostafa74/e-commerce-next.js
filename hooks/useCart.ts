"use client"

import { Cart } from "@/interfaces/cart"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { baseUrl } from "./api"



export function useAddToCard() {
    const queryClient = useQueryClient()

    const query = useMutation({
        mutationKey: ["addToCart"],
        mutationFn: async (prodId: string) => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdjNzEzODI0ZDMzNjJjNDUyZDE3MiIsIm5hbWUiOiJBZGhhbSBNb3N0YWZhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njk0NTc0MjgsImV4cCI6MTc3NzIzMzQyOH0.chP1j1CltDmBFTruLvdbZcY1U7Us3Eyf2qtkRPUBahQ'
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

    const query = useQuery<Cart>({
        queryKey: ["getCart"],
        queryFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
                method: 'get',
                headers: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdjNzEzODI0ZDMzNjJjNDUyZDE3MiIsIm5hbWUiOiJBZGhhbSBNb3N0YWZhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njk0NTc0MjgsImV4cCI6MTc3NzIzMzQyOH0.chP1j1CltDmBFTruLvdbZcY1U7Us3Eyf2qtkRPUBahQ'
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

    const query = useMutation<Cart>({
        mutationKey: ["removeCartItem"],
        mutationFn: async () => {
            const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart/" + prodId, {
                method: 'delete',
                headers: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdjNzEzODI0ZDMzNjJjNDUyZDE3MiIsIm5hbWUiOiJBZGhhbSBNb3N0YWZhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njk0NTc0MjgsImV4cCI6MTc3NzIzMzQyOH0.chP1j1CltDmBFTruLvdbZcY1U7Us3Eyf2qtkRPUBahQ'
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

    const query = useMutation({
        mutationKey: ["clearCart"],
        mutationFn: async () => {
            const res = await fetch(baseUrl + "cart", {
                method: "delete",
                headers: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdjNzEzODI0ZDMzNjJjNDUyZDE3MiIsIm5hbWUiOiJBZGhhbSBNb3N0YWZhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njk0NTc0MjgsImV4cCI6MTc3NzIzMzQyOH0.chP1j1CltDmBFTruLvdbZcY1U7Us3Eyf2qtkRPUBahQ'
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

    return useMutation({
        mutationKey: ["changeItemQuantity"],

        // ✅ 1. API CALL ONLY
        mutationFn: async ({ prodId, itemCount }: { prodId: string; itemCount: number }) => {
            const res = await fetch(baseUrl + "cart/" + prodId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzdjNzEzODI0ZDMzNjJjNDUyZDE3MiIsIm5hbWUiOiJBZGhhbSBNb3N0YWZhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njk0NTc0MjgsImV4cCI6MTc3NzIzMzQyOH0.chP1j1CltDmBFTruLvdbZcY1U7Us3Eyf2qtkRPUBahQ'

                },
                body: JSON.stringify({ count: itemCount }),
            })

            if (!res.ok) {
                throw new Error("Failed to change item quantity")
            }

            return res.json()
        },

        // ✅ 2. OPTIMISTIC UPDATE
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

        // ✅ 3. ROLLBACK ON FAILURE
        onError: (error, variables, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(["getCart"], context.previousCart)
            }
        },

        // ✅ 4. FINAL SYNC WITH SERVER
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getCart"] })
        },
    })
}
