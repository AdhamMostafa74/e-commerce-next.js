'use client'
import { CarouselComponent } from '@/components/Home Componenets/Carousel'
import CategoriesCarousel from '@/components/Home Componenets/CategoryCards'
import TopSellingProductsCard from '@/components/Home Componenets/TopSellingProductsCards'


export default function Home() {


    return (
        <div className='container mt-3'>

            <CarouselComponent />

            <h2 className="text-center text-2xl md:text-3xl lg:text-2xl font-bold text-blue-500 mb-6 border-b-2 py-3">
                Popular Categories
            </h2>
            <CategoriesCarousel />
            <h2 className="text-center text-2xl md:text-3xl lg:text-2xl font-bold text-blue-500 mb-6 border-b-2 py-3 mt-3">
                Top Selling Products
            </h2>
            <TopSellingProductsCard />
        </div>)
}
