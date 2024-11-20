


'use client'

import React, { useState } from 'react';
import NavBar from '../components/nav/NavBar';
import Categories from '../components/nav/Categories';
import Container from '../components/Container';
import HomeBanner from '../components/HomeBanner';
import ProductCard from '../components/products/ProductCard';
import { Pagination, Select, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import RenderIf from '@/utils/RenderIf';
import { calculateDiscountedPrice } from '@/utils/util';
import { MdSearchOff } from "react-icons/md";

interface Props {
    products: any[];
    currentPage: number;
    categoryQuery?: string;
    collectionQuery?: string;
    label?: string;
    namePage: string;
    valueSearch?: string;
}

const HomePageLayout: React.FC<Props> = ({ products, currentPage, categoryQuery, label, namePage, collectionQuery, valueSearch ='' }) => {
    const [sortOrder, setSortOrder] = useState<string>('default');
    const router = useRouter();

    const handleOnSearch = (searchQuery: string) => {
        router.push(`/search?keyword=${searchQuery}`);
    }

    // Sort products based on selected sort order
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === 'price_asc') {
            return calculateDiscountedPrice(a.productVariations[0].price, a.productVariations[0].discountPercent) - calculateDiscountedPrice(b.productVariations[0].price, b.productVariations[0].discountPercent);
        } else if (sortOrder === 'price_desc') {
            return calculateDiscountedPrice(b.productVariations[0].price, b.productVariations[0].discountPercent) - calculateDiscountedPrice(a.productVariations[0].price, a.productVariations[0].discountPercent);
        } else if (sortOrder === 'best_seller') {
            return b.totalSold - a.totalSold;
        }
        return 0; // Default order
    });

    const handleBestSellerClick = () => {
        setSortOrder('best_seller');
    };

    return (
        <div>
            <NavBar valueSearch={valueSearch} query={collectionQuery} onSearch={handleOnSearch} />
            <Categories query={categoryQuery} />
            <div className="p-8">
                <Container>
                    <HomeBanner />

                    <div className="flex justify-between mb-4  gap-4 items-center" >

                        <RenderIf isTrue={!!label}>
                            <p className='py-2'> TRANG CHỦ / {label}</p>
                        </RenderIf>
                        <RenderIf isTrue={sortedProducts.length > 0}>
                            <div className='flex gap-4 items-center'>
                                <span>Sắp xếp theo: </span>
                                <Select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    displayEmpty
                                    variant="outlined"
                                    className='h-[35px]'
                                >
                                    <MenuItem value="default">Mặc định</MenuItem>
                                    <MenuItem value="best_seller">Bán chạy</MenuItem>
                                    <MenuItem value="price_asc">Giá: Thấp đến Cao</MenuItem>
                                    <MenuItem value="price_desc">Giá: Cao đến Thấp</MenuItem>
                                </Select>
                            </div>
                        </RenderIf>


                    </div>

                    <div
                        className="grid grid-cols-2 
                            sm:grid-cols-3 
                            lg:grid-cols-4
                            xl:grid-cols-5
                            2xl:grid-cols-6
                            gap-8"
                    >
                        {sortedProducts.map((product) => (
                            <ProductCard key={product?.id} product={product} />
                        ))}
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <RenderIf isTrue={sortedProducts.length === 0}>

                            <div className='flex items-center gap-2 text-slate-700'>
                                <MdSearchOff size={40} />
                                <p className="py-5  text-xl">
                                    Không tìm thấy kết quả phù hợp
                                </p>
                            </div>
                            <p className='text-gray-500 text-2xl'>Hãy thử sử dụng các từ khóa chung chung hơn</p>
                        </RenderIf>
                    </div>

                    <div className="flex justify-center mt-10">
                        <RenderIf isTrue={namePage === 'collections'}>
                            <Pagination
                                count={10}
                                color="primary"
                                page={Number(currentPage)}
                                onChange={(event, page) => router.push(`/${namePage}?q=${collectionQuery}&&page=${page}`)}
                            />
                        </RenderIf>

                        <RenderIf isTrue={namePage === 'category'}>
                            <Pagination
                                count={10}
                                color="primary"
                                page={Number(currentPage)}
                                onChange={(event, page) => router.push(`/${namePage}?q=${categoryQuery}&&page=${page}`)}
                            />
                        </RenderIf>

                        <RenderIf isTrue={namePage === 'daily_discover'}>
                            <Pagination
                                count={10}
                                color="primary"
                                page={Number(currentPage)}
                                onChange={(event, page) => router.push(`/${namePage}?page=${page}`)}
                            />
                        </RenderIf>

                        <RenderIf isTrue={namePage === 'search'}>
                            <Pagination
                                count={10}
                                color="primary"
                                page={Number(currentPage)}
                                onChange={(event, page) => router.push(`/${namePage}?keyword=${valueSearch}&&page=${page}`)}
                            />
                        </RenderIf>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default HomePageLayout;

