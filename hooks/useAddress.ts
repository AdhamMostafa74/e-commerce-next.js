'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { baseUrl } from "./api"
import toast from "react-hot-toast"
import { CheckoutFormData } from "@/app/checkout/page"
import { Addresses } from "@/types/address"
type UserAddress = {
    formData: CheckoutFormData,
    name: string | undefined
}


export function useAddAddress() {
    const queryClint = useQueryClient()

    const { data } = useSession()

    const query = useMutation({
        mutationFn: async ({ formData }: UserAddress) => {

            const res = await fetch(baseUrl + 'addresses', {
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
                queryKey: ["getAddresses"]
            })
            toast.success('Address Added Successfully!', { duration: 3000 })

        },
        onError: () => {
            toast.error('An error occurred!')

        },

    })

    return query
}
export function useRemoveAddress() {
    const queryClint = useQueryClient()

    const { data } = useSession()

    const query = useMutation({
        mutationFn: async (addressId: string) => {

            const res = await fetch(baseUrl + 'addresses/' + addressId, {
                method: 'DELETE',
                headers: {
                    token: data!.accessToken
                },

            })

            if (!res.ok) {
                throw new Error("An error occurred!")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ["getAddresses"]
            })
            toast.success('Address Removed Successfully!', { duration: 3000 })

        },
        onError: () => {
            toast.error('An error occurred!')

        },

    })

    return query
}



export function useUserAddress() {

    const { data } = useSession()

    const query = useQuery<Addresses>({
        queryKey: ['getAddresses'],
        queryFn: async () => {
            const res = await fetch(baseUrl + 'addresses', {
                headers: {
                    token: data!.accessToken
                },
            })
            if (!res.ok) {
                throw new Error("An error occurred!")
            }
            return res.json()
        }
    })

    return query
}
