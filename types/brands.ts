export interface brands {
    results: number
    metadata: Metadata
    data: brand[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
}

export interface brand {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
}
