
import React from 'react'
import SearchClient from '../components/search/SearchClient'
import HomePageLayout from '../home/HomePageLayout'
import { fetchProductsWithFiltersAPI, fetchProductsWithSearchAPI } from '@/services/productService'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

interface Props {
    searchParams?: { keyword?: string, page: number }

}

const SearchPage: React.FC<Props> = async ({ searchParams }) => {

    const page = searchParams?.page || 1
    const keyword = searchParams?.keyword || ''
    const session = await getServerSession(authOptions)
    const token = session?.user?.accessToken;
    const products = await fetchProductsWithSearchAPI(keyword, page,token) || []
 
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
