export interface Cart {
    status: string
    numOfCartItems: number
    cartId: string
    data: Data
}

export interface Data {
    _id: string
    cartOwner: string
    products: CartProduct[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface CartProduct {
    count: number
    _id: string
    product: CartProduct2
    price: number
}

export interface CartProduct2 {
    subcategory: Subcategory[]
    _id: string
    title: string
    quantity: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    id: string
}

export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
}

export interface Category {
    _id: string
    name: string
    slug: string
    image: string
}

export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}
