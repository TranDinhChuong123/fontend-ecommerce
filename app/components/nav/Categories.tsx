
// 'use client'

// import React from 'react'
// import { useRouter } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'

// const categories = [
//     { label: 'Áo thời trang', imgSrc: '/aonam.jpg', query: 'thoi-trang-nam' },
//     { label: 'Điện thoại', imgSrc: '/phone.jpg', query: 'dien-thoai-smartphone' },
//     { label: 'Điện gia dụng', imgSrc: '/dien.jpg', query: 'dien-gia-dung' },
//     { label: 'Giày thể thao', imgSrc: '/giay.jpg', query: 'giay-the-thao' },
// ]

// interface CategoriesProps {
//     query?: string
// }

// const Categories: React.FC<CategoriesProps> = ({ query = '' }) => {
//     const router = useRouter()

//     return (
//         <div className="px-16">
//             <div className="w-full flex flex-row gap-2 items-center justify-around py-5 text-slate-700">
//                 {categories.map((category, index) => (
//                     <Link
//                         key={index}
//                         className={`${category.query === query ? 'bg-sky-500 text-white' : null} rounded-full flex flex-col gap-1 items-center border py-1 w-[25%] justify-center`}
//                         href={`/category?q=${category.query}`}

//                     >
//                         <Image
//                             src={category.imgSrc}
//                             width={100}
//                             height={100}
//                             alt={category.label}
//                             className="rounded-full"
//                         />
//                         <p className="text-lg">{category.label}</p>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Categories

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
    { label: 'Áo thời trang', imgSrc: '/aonam.jpg', query: 'thoi-trang-nam' },
    { label: 'Điện thoại', imgSrc: '/phone.jpg', query: 'dien-thoai-smartphone' },
    { label: 'Điện gia dụng', imgSrc: '/dien.jpg', query: 'dien-gia-dung' },
    { label: 'Giày thể thao', imgSrc: '/giay.jpg', query: 'giay-the-thao' },
]

interface CategoriesProps {
    query?: string
}

const Categories: React.FC<CategoriesProps> = ({ query = '' }) => {
    const router = useRouter()

    return (
        <div className="px-4 md:px-16">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 py-6 text-slate-700">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        className={`${
                            category.query === query
                                ? 'bg-sky-500 text-white transform scale-105'
                                : 'bg-white hover:bg-sky-100 hover:scale-105'
                        } transition-all duration-300 ease-in-out rounded-xl flex flex-col items-center justify-center p-4 border shadow-md`}
                        href={`/category?q=${category.query}`}
                    >
                        <Image
                            src={category.imgSrc}
                            width={100}
                            height={100}
                            alt={category.label}
                            className="rounded-full object-cover shadow-lg"
                        />
                        <p className="text-lg font-semibold mt-2">{category.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories


