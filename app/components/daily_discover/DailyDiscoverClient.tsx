'use client';

import React from 'react';
import NavBar from '../nav/NavBar';
import Categories from '../nav/Categories';
import Container from '../Container';
import HomeBanner from '../HomeBanner';
import ProductCard from '../products/ProductCard';
import { useRouter } from 'next/navigation';
import HomePageLayout from '@/app/home/HomePageLayout';

interface Props {
    products: any[];
    currentPage: number;
}

const DailyDiscoverClient: React.FC<Props> = ({ products, currentPage }) => {
    const router = useRouter();

    return (
       
        <HomePageLayout namePage='daily_discover' products={products} currentPage={currentPage} label='GỢI Ý SẢN PHẨM' />
    );
};

export default DailyDiscoverClient;
