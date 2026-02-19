'use client'

import Card from '@/components/Card'
import { useProducts2 } from '@/hooks/useProducts'
import LoadingScreen from '@/utilities/LoadingScreen'
import { useParams } from 'next/navigation'

export default function SingleCatgory() {
    const { categoryId } = useParams()
    console.log(categoryId)

    const { data: CategoryProducts, isLoading } = useProducts2(categoryId as string)
    console.log(CategoryProducts)

    return (
        <div>
            {isLoading ? <LoadingScreen /> :

                CategoryProducts?.data.length == 0 ?
                    <div className='h-[40vh] text-center flex'>

                        <h2 className='text-2xl text-center w-full  m-auto '>No products available in this category</h2>

                    </div>

                    : <div className=" 
                       bg-slate-200 m-6 rounded-2xl min-h-[40vh]
                      grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 
                      gap-6 p-10 ">
                        {

                            CategoryProducts?.data.map((CategoryProduct) => (


                                <Card
                                    key={CategoryProduct._id}
                                    product={CategoryProduct}
                                />

                            ))
                        }
                    </div>
            }
        </div>
    )
}
