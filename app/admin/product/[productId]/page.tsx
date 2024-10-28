
import ProductDetailClient from '@/app/components/admin/product/ProductDetailClient';
import React from 'react'


interface IPrams {
    productId?: string;
}

const ADProductDetailPage = ({ params }: { params: IPrams }) => {

    return (
        <div>
            <ProductDetailClient productId={params.productId || ''} />
        </div>
    )
}

export default ADProductDetailPage
