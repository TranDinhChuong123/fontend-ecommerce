'use client'

import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import Categories from '../components/nav/Categories'
import HomeBanner from '../components/HomeBanner'
import { fetchProductsWithFiltersAPI } from '@/services/productService'
import ProductCard from '../components/products/ProductCard'
import { Pagination } from '@mui/material'
import NavBar from '../components/nav/NavBar'
import axios from '@/services/axios/publicAxios'
import handleApiCall from '@/services/handleApiCall'
import Link from 'next/link'

interface HomeClientProps {
    currentPage: number
}

const HomeClient = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const fetchProducts = async () => {
            const data = await fetchProductsWithFiltersAPI();
            console.log("data", data);
            setProducts(data);

        };

        fetchProducts();
    }, [currentPage]);

    console.log("products", products);


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div>
        <NavBar />
        <Categories />
        <div className="p-8">

          <Container>
  
            <HomeBanner />
  
            <div className="flex justify-between">
              <p className='py-5'> TRANG CHỦ / GỢI Ý SẢN PHẨM</p>
            </div>
  
  
            <div className="grid grid-cols-2 
              sm:grid-cols-3 
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            ">
              {products.map((product: any) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
  
            <div className="flex justify-center mt-[20px]">
              <Link className="text-white bg-slate-400 px-[150px] py-2" href='/daily_discover?page=2'>
                Xem thêm
              </Link>
            </div>
  
          </Container>
  
  
        </div>
      </div>
    )
}

export default HomeClient
