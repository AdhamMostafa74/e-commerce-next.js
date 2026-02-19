export interface Addresses {
    results: number
    status: string
    data: Address[]
}

export interface Address {
    _id: string
    details: string
    phone: string
    city: string
}
