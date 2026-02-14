import { useQuery } from "@tanstack/react-query"
import { baseUrl } from "./api"
import { subcategories } from "@/types/subCategories"

interface subCatResponse {
    data: subcategories[]
}
export function useSubCategories() {
    const query = useQuery<subCatResponse>({
        queryKey: ["getSubCategories"],
        queryFn: async () => {
            const res = await fetch(baseUrl + "subcategories", {
                cache: "force-cache",
            })

            if (!res.ok) {
                throw new Error("Failed to fetch subcategories")
            }

            return res.json()
        },
    })

    return query
}
