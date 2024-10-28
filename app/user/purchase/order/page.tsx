
import NavBar from '@/app/components/nav/NavBar'
import React from 'react'
import OrderDetail from './OrderDetail'


interface Props {
    searchParams: { orid?: string };
}


const OrderDetailPage: React.FC<Props> = ({ searchParams }) => {



    return (
        <div>
            <NavBar />
            <OrderDetail orderId={searchParams.orid || ''} />
        </div>
    )
}

export default OrderDetailPage
