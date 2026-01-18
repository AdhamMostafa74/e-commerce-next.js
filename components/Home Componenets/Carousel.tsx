

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import image1 from '@/assets/slider-image-1.jpeg'
import image2 from '@/assets/slider-image-2.jpeg'
import image3 from '@/assets/slider-image-3.jpeg'
import Image from "next/image"

export function CarouselComponent() {

    const carouselImages = [
        image2,
        image1,
        image3,
    ]

    return (
        <Carousel className="container w-5/12  mx-auto">
            <CarouselContent>
                {carouselImages.map((_, index) => (
                    <CarouselItem className="basis-md mt-1" key={index}>
                        <div className="p-1  ">
                            <Card>
                                <CardContent className="flex aspect-video items-center justify-center ">
                                    <div >
                                        <Image
                                            width={_.width}
                                            height={_.height}
                                            src={_.src}
                                            alt="test"
                                            className="bg-cover"
                                        ></Image>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
