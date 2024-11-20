// 'use client'

// import { truncateText } from "@/utils/util";
// import { PiUserCircleThin } from "react-icons/pi";
// import { CiEdit } from "react-icons/ci";
// import { IoMdNotifications } from "react-icons/io";
// import { FaUser } from "react-icons/fa";
// import { RiShoppingBagFill } from "react-icons/ri";
// import { FaFaceGrinStars } from "react-icons/fa6";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { RiMapPin2Line } from "react-icons/ri"

// import { usePathname } from 'next/navigation';

// const SideBar: React.FC = () => {
//     const pathname = usePathname() || '/';
//     const lastPathSegment = pathname.split('/').pop() || 'purchase';

//     const { data: session } = useSession()
//     const router = useRouter();
//     const [selectedPage, setSelectedPage] = useState(lastPathSegment);
//     const handleButtonClick = (page: string) => {
//         router.push(`/user/${page}`);
//         setSelectedPage(page)
//     };


//     return (
//         <div className="flex flex-col items-center w-[22%] text-slate-700 border">
//             <div className="flex flex-row items-center border-b py-2">
//                 <PiUserCircleThin size={50} />
//                 <div className="flex flex-col items-start">
//                     {truncateText(session?.user?.name || 'tai khoan', 14)}
//                     <button className="flex flex-row items-center ">
//                         <CiEdit size={20} />
//                         Sửa hồ sơ
//                     </button>
//                 </div>
//             </div>

//             <button className={`
//                 ${selectedPage === 'address' ? 'bg-teal-700 text-white' : null}
//                 flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
//                 onClick={() => handleButtonClick('address')}
//             >

//                 <div className="relative flex flex-row items-center w-[80%] h-full order">
//                     <div className="absolute  top-[6px] left-[2px]">
//                         <RiMapPin2Line size={21} />
//                     </div>
//                     <p className="absolute top-[6px] left-[30px] text-lg ">
//                         Địa chỉ của tôi
//                     </p>
//                 </div>

//             </button>

//             <button className={`
//                 ${selectedPage === 'notification' ? 'bg-teal-700 text-white' : null}
//                 flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
//                 onClick={() => handleButtonClick('notification')}
//             >

//                 <div className="relative flex flex-row items-center w-[80%] h-full order">
//                     <div className="absolute  top-[6px]">
//                         <IoMdNotifications size={25} />
//                     </div>
//                     <p className="absolute top-[6px] left-[30px] text-lg ">
//                         Thông báo của tôi
//                     </p>
//                 </div>

//             </button>
//             <button className={`
//                 ${selectedPage === 'purchase' ? 'bg-teal-700 text-white' : null}
//             flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
//                 onClick={() => handleButtonClick('purchase')}
//             >

//                 <div className="relative flex flex-row items-center w-[80%] h-full order">
//                     <div className="absolute  top-[6px]">
//                         <RiShoppingBagFill size={23} />
//                     </div>
//                     <p className="absolute top-[6px] left-[30px] text-lg ">
//                         Quản lý đơn hàng
//                     </p>
//                 </div>

//             </button>

//             <button className={`
//                 ${selectedPage === 'review' ? 'bg-teal-700 text-white' : null}
//             flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
//                 onClick={() => handleButtonClick('review')}
//             >

//                 <div className="relative flex flex-row items-center w-[80%] h-full order">
//                     <div className="absolute  top-[7px]">
//                         <FaFaceGrinStars size={20} />
//                     </div>
//                     <p className="absolute top-[6px] left-[30px] text-lg ">
//                         Đánh giá của tôi
//                     </p>
//                 </div>

//             </button>



//             {/* <button>Thông báo của tôi</button>
//             <button>Quản lý đơn hàng</button>
//             <button>Đánh giá sản phẩm</button>
//             // <button>Nhận xét của tôi</button> */}
//         </div>
//     )
// }

// export default SideBar

'use client'

import { truncateText } from "@/utils/util";
import { PiUserCircleThin } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { RiShoppingBagFill, RiMapPin2Line } from "react-icons/ri";
import { FaFaceGrinStars } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';

const SideBar: React.FC = () => {
    const pathname = usePathname() || '/';
    const lastPathSegment = pathname.split('/').pop() || 'purchase';
    const { data: session } = useSession();
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState(lastPathSegment);

    const handleButtonClick = (page: string) => {
        router.push(`/user/${page}`);
        setSelectedPage(page);
    };

    const menuItems = [
        // { label: 'Thông báo của tôi', icon: <IoMdNotifications size={25} />, page: 'notification' },
        { label: 'Quản lý đơn hàng', icon: <RiShoppingBagFill size={23} />, page: 'purchase' },
        { label: 'Địa chỉ của tôi', icon: <RiMapPin2Line size={21} />, page: 'address' },
        { label: 'Đánh giá của tôi', icon: <FaFaceGrinStars size={20} />, page: 'review' }
    ];

    return (
        <div className="flex flex-col items-center w-[22%] text-slate-700 border">
            <div className="flex flex-row items-center border-b py-2">
                <PiUserCircleThin size={50} />
                <div className="flex flex-col items-start">
                    {truncateText(session?.user?.name || 'tai khoan', 14)}
                    {/* <button className="flex flex-row items-center">
                        <CiEdit size={20} />
                        Sửa hồ sơ
                    </button> */}
                </div>
            </div>

            {menuItems.map(({ label, icon, page }) => (
                <button
                    key={page}
                    className={`${
                        selectedPage === page ? 'bg-teal-700 text-white' : ''
                    } flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
                    onClick={() => handleButtonClick(page)}
                >
                    <div className="relative flex flex-row items-center w-[80%] h-full order">
                        <div className="absolute top-[6px] left-[2px]">
                            {icon}
                        </div>
                        <p className="absolute top-[6px] left-[30px] text-lg">
                            {label}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default SideBar;

