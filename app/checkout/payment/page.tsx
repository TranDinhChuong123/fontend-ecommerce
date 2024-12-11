'use client'

import React from 'react'
import FormWrap from '../../components/common/FormWrap'
import PaymentClient from './PaymentClient'
import Container from '../../components/common/Container'
import NavBar from '@/app/components/nav/NavBar'

const CheckoutPaymentPage = () => {
    return (
        <div className=''>
            <NavBar label="Thẻ thanh toán" />
            <div className='w-full bg-slate-50 flex items-center justify-center py-10'>
                <div className='bg-white w-[45%] p-4 '>
                    {/* <PaymentClient /> */}
                </div>
            </div>
        </div>
    )
}

export default CheckoutPaymentPage
