
import ReceiptClient from '@/app/components/admin/inventory/ReceiptClient';
import React from 'react'

interface Props {
    searchParams: { sku?: string };
}

const page: React.FC<Props> = ({ searchParams }) => {
    return (
        <div>
            <ReceiptClient sku={searchParams.sku || 'dd3c05bc-83b3-4bf4-ba32-23cd3e2812cd'} />
        </div>
    )
}

export default page
