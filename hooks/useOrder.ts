'use client'
import { useQuery } from "@tanstack/react-query"
import { baseUrl } from "./api"
import { useSession } from "next-auth/react"
import { ParamValue } from "next/dist/server/request/params"

export function useGetOrder(userId?: ParamValue) {
    return useQuery({
        queryKey: ['getOrders', userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await fetch(`${baseUrl}orders/user/${userId}`)
            if (!res.ok) throw new Error('An error occurred')
            return res.json()
        },
    })
}


export function useUserData() {

    const { data } = useSession()
    const query = useQuery({
        queryKey: ['getOrders'],
        queryFn: async () => {
            const res = await fetch(baseUrl + 'auth/verifyToken', {
                headers: {
                    token: data!.accessToken
                }
            })
            if (!res.ok) {
                throw new Error("An error occurred!")
            }
            return res.json()
        }
    })

    return query
}
