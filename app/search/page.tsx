
import React from 'react'
import SearchClient from '../components/search/SearchClient'
import HomePageLayout from '../home/HomePageLayout'
import { fetchProductsWithFiltersAPI, fetchProductsWithSearchAPI } from '@/services/productService'

interface Props {
    searchParams?: { keyword?: string, page: number }

}

const SearchPage: React.FC<Props> = async ({ searchParams }) => {

    const page = searchParams?.page || 1
    const keyword = searchParams?.keyword || ''
    const products = await fetchProductsWithSearchAPI(keyword, page) || []
    console.log("products", products);


    return (
        <HomePageLayout
            valueSearch={keyword}
            currentPage={page}
            namePage='search'
            products={products}
        />
    )
}

export default SearchPage
