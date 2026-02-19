import { Brand } from "@/types/cart"
import { useQuery } from "@tanstack/react-query"
import { ParamValue } from "next/dist/server/request/params"
import { baseUrl } from "./api"

export function useSingleBrand(brandId: ParamValue) {
    const query = useQuery({
        queryKey: ["getSingleBrand", brandId],
        queryFn: async () => {
            const res = await fetch(baseUrl + `brands`,
                {
                    cache: "force-cache",
                })
            if (!res.ok) {
                throw new Error("Failed to fetch brand")
            }
            return res.json()

        }

    })
    return query

}
