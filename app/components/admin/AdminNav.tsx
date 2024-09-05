'use client'

import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import AdminNavItem from './AdminNavItem'
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from 'react-icons/md'
import { usePathname } from 'next/navigation'

const AdminNav = () => {
    const pathName = usePathname()
    return (
        <div className='w-full shadow-sm border-b-[1px] top-20 pt-4'>
            {/* overflow-auto: Thêm thanh cuộn tự động nếu nội dung bên trong phần tử vượt quá kích thước của phần tử.
            flex-nowrap: Ngăn không cho các phần tử con của phần tử flex gói lại,
             tức là không cho phép các phần tử con bị gói lại và tiếp tục nằm trong 
             cùng một hàng (hoặc cột tùy thuộc vào hướng flex). */}
            <Container>
                <div className='flex items-center flex-row
                  justify-between md:justify-center gap-8
                  md:gap-12 overflow-auto flex-nowrap'
                >
                    <Link href='/admin'>
                        <AdminNavItem
                            icon={MdDashboard}
                            label='Summary'
                            selected={pathName === '/admin'} />
                    </Link>
                    <Link href='/admin/add-products'>
                        <AdminNavItem
                            icon={MdLibraryAdd}
                            label='AddProducts'
                            selected={pathName === '/admin/add-products'} />
                    </Link>
                    <Link href='/admin/manage-products'>
                        <AdminNavItem
                            icon={MdDns}
                            label='ManageProducts'
                            selected={pathName === '/admin/manage-products'} />
                    </Link>
                    <Link href='/admin/mange-orders'>
                        <AdminNavItem
                            icon={MdFormatListBulleted}
                            label='ManageOrders'
                            selected={pathName === '/admin/mange-orders'} />
                    </Link>


                </div>
            </Container>


        </div>
    )
}

export default AdminNav
