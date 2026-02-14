export interface data {
    results: number
    metadata: Metadata
    data: subcategories[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
}

export interface subcategories {
    _id: string
    name: string
    slug: string
    category: string
    createdAt: string
    updatedAt: string
}
