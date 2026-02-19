'use client'

import Card from '@/components/Card'
import { useSingleBrand } from '@/hooks/useBrand'
import LoadingScreen from '@/utilities/LoadingScreen'
import { useParams } from 'next/navigation'
import clsx from 'clsx'
import { brand } from '@/types/brands'

export default function SingleBrand() {
    const { brandId } = useParams()

    const { data: brandProducts, isLoading } =
        useSingleBrand(brandId as string)

    if (isLoading) return <LoadingScreen />

    return (
        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                gap-6
                p-6
            "
        >
            {brandProducts?.data.map((brand: brand) => {
                const isActive = brand._id === brandId

                return (
                    <div
                        key={brand._id}
                        className={clsx(
                            'transition-all',
                            isActive && 'ring-2 ring-amber-500 rounded-2xl'
                        )}
                    >
                        <Card
                            category={brand}
                        />
                    </div>
                )
            })}
        </div>
    )
}
