'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { baseUrl } from "./api"
import toast from "react-hot-toast"
import { CheckoutFormData } from "@/app/checkout/page"
type cashPayment = {
    formData: CheckoutFormData,
    cartId: string | undefined
}

export function useCashPayment() {
    const queryClint = useQueryClient()

    const { data } = useSession()

    const query = useMutation({
        mutationFn: async ({ formData, cartId }: cashPayment) => {

            const res = await fetch(baseUrl + "orders/" + cartId, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    token: data!.accessToken
                },
                body: JSON.stringify(formData)

            })

            if (!res.ok) {
                throw new Error("An error occurred!")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ["getCart"]
            })
            toast.success('Order Created Successfully!', { duration: 3000 })

        },
        onError: () => {
            toast.error('An error occurred!')

        },

    })

    return query
}

