
'use client'
import React from 'react'
import { IoShirtOutline } from "react-icons/io5";
import { MdWatch } from "react-icons/md";
import { MdLaptopMac } from "react-icons/md";
import { GiSmartphone } from "react-icons/gi";
import { useRouter } from 'next/navigation';
// const categories = [
//     { label: 'Áo nam', icon: 'MdOutlineCategory' },
//     { label: 'Áo nữ', icon: 'MdOutlineLocalOffer' },
//     { label: 'Điện thoại', icon: 'MdOutlineShoes' },
//     { label: 'Giày dép nữ', icon: 'MdOutlineShoes' },
//     { label: 'Giầy thể thao', icon: 'MdOutlineSportsSoccer' },
//     { label: 'Đồ chơi game', icon: 'MdOutlinePlayStation' },
//     { label: 'Đồ chơi thể thao

// ]

const Categories = () => {
    const router = useRouter()
    return (

        <div className='w-full flex flex-row gap-2 items-center justify-around py-5'>
            <button className='flex flex-row gap-1 text-slate-500 items-center border py-1  w-[25%] justify-center'
                onClick={() => router.push('/category?q=ao-thoi-trang')}
            >
                <IoShirtOutline size={30} />
                <p>Áo thời trang</p>
            </button>
            <button className='flex flex-row gap-1 text-slate-500 items-center border py-1 w-[25%] justify-center'
                onClick={() => router.push('/category?q=ao-thoi-trang')}
            >
                <GiSmartphone size={30} />
                <p>Điện thoại</p>
            </button>
            <button className='flex flex-row gap-1 text-slate-500 items-center border py-1 w-[25%] justify-center' >
                <MdLaptopMac size={30} />
                <p>Lap top</p>
            </button>
            <button className='flex flex-row gap-1 text-slate-500 items-center border py-1 w-[25%] justify-center'>
                <MdWatch size={30} />
                <p>Đồng hồ</p>
            </button>
        </div>
    )
}

export default Categories
