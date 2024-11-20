
import ListSkuClient from '@/app/components/admin/inventory/ListSkuClient';
import React from 'react'

interface IPrams {
    productId?: string;
}

const page = ({ params }: { params: IPrams }) => {
    return (
        <div>
            <ListSkuClient productId={params.productId || ''} />
        </div>
    )
}

export default page
