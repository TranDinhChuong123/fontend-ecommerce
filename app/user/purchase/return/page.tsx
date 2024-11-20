
import NavBar from '@/app/components/nav/NavBar'
import React from 'react'
import OrderDetailReturn from './OrderDetailReturn'


interface Props {
    searchParams: { orid?: string };
}


const OrderDetailPage: React.FC<Props> = ({ searchParams }) => {



    return (
        <div>
            <OrderDetailReturn orderId={searchParams.orid || ''} />
        </div>
    )
}

export default OrderDetailPage
