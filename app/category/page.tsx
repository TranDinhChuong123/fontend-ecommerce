
import React from 'react'
import NavBar from '../components/nav/NavBar'
import Categories from '../components/nav/Categories'
import Container from '../components/common/Container'
import HomeBanner from '../home/HomeBanner'
import { fetchProductsWithCategoryAPI, fetchProductsWithFiltersAPI } from '@/services/productService'
import ProductCard from '../components/products/ProductCard'
import HomePageLayout from '../home/HomePageLayout'


interface CategoryPageProps {
    searchParams: { q?: string, page?: number, keyword?: string };
}

const CategoryPage = async ({ searchParams }: CategoryPageProps) => {

    const categoryQuery = searchParams.q || 'thoi-trang-nam'
    const page = searchParams.page || 1
    const keyword = searchParams.keyword || null
    const products = await fetchProductsWithCategoryAPI(categoryQuery, page, keyword);

    return (
        <HomePageLayout
            products={products}
            namePage='category'
            currentPage={page || 1}
            categoryQuery={categoryQuery}
            label={
                categoryQuery === 'thoi-trang-nam' ? 'THỜI TRANG NAM' :
                    categoryQuery === 'dien-thoai-smartphone' ? 'ĐIỆN THOẠI' :
                        categoryQuery === 'dien-gia-dung' ? 'ĐIỆN GIA DỤNG' :
                            categoryQuery === 'giay-the-thao' ? 'GIÀY THỂ THAO' : ''

            } />
    )
}

export default CategoryPage
