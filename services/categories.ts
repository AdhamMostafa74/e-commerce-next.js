const baseUrl = 'https://ecommerce.routemisr.com/api/v1/'

 async function getAllCategoriesApi() {
    try {
        const response = await fetch(baseUrl + 'categories')
        if (response.ok) {
            const data = response.json
            return data

        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
}
