
import React from 'react'
import NavBar from '../components/nav/NavBar'
import Categories from '../components/nav/Categories'
import Container from '../components/common/Container'
import HomeBanner from '../home/HomeBanner'
import { fetchProductsWithCategoryAPI, fetchProductsWithDiscountAPI, fetchProductsWithFiltersAPI, fetchProductsWithTotalSoldAPI } from '@/services/productService'
import ProductCard from '../components/products/ProductCard'
import RenderIf from '@/utils/RenderIf'
import HomePageLayout from '../home/HomePageLayout'


interface CategoryPageProps {
    searchParams: { q?: string, page?: number };
}

const CategoryPage = async ({ searchParams }: CategoryPageProps) => {
    const { q, page } = searchParams;
    let products
    if (q === 'san-pham-moi') {
        products = await fetchProductsWithFiltersAPI(page);
    } else if (q === 'san-pham-sale') {
        products = await fetchProductsWithDiscountAPI(5, page);
    } else if (q === 'san-pham-ban-chay') {
        products = await fetchProductsWithTotalSoldAPI(page);
    } else if (q === 'san-pham-gia-tot') {
        products = await fetchProductsWithDiscountAPI(7, page);
    }
    return (
        <HomePageLayout
            namePage='collections'
            collectionQuery={q}
            currentPage={Number(page) || 1}
            products={products}
            categoryQuery={q}
            label={
                q === 'san-pham-moi' ? 'SẢN PHẨM MỚI' :
                    q === 'san-pham-sale' ? 'SẢN PHẨM SALE' :
                        q === 'san-pham-ban-chay' ? 'SẢN PHẨM BÁN CHẠY' :
                            'SẢN PHẨM GIÁ TỐT'
            }
        />
        // <div>
        //     <NavBar query={q} />
        //     <Categories />

        //     <div className="p-8">
        //         <Container>

        //             <HomeBanner />

        //             <RenderIf isTrue={q === 'san-pham-moi'}>
        //                 <p className='py-5'> TRANG CHỦ / SẢN PHẨM MỚI</p>
        //             </RenderIf>

        //             <RenderIf isTrue={q === 'san-pham-sale'}>
        //                 <p className='py-5'> TRANG CHỦ / SẢN PHẨM SALE</p>
        //             </RenderIf>

        //             <RenderIf isTrue={q === 'san-pham-ban-chay'}>
        //                 <p className='py-5'> TRANG CHỦ / SẢN PHẨM BÁN CHẠY</p>
        //             </RenderIf>

        //             <RenderIf isTrue={q === 'san-pham-gia-tot'}>
        //                 <p className='py-5'> TRANG CHỦ / SẢN PHẨM GIÁ TỐT</p>
        //             </RenderIf>

        //             <div className="grid grid-cols-2 
        //                 sm:grid-cols-3 
        //                 lg:grid-cols-4
        //                 xl:grid-cols-5
        //                 2xl:grid-cols-6
        //                 gap-8
        //                 ">
        //                 {products.map((product: any) => (
        //                     <ProductCard key={product.id} product={product} />
        //                 ))}
        //             </div>

        //         </Container>
        //     </div>
        // </div>
    )
}

export default CategoryPage
