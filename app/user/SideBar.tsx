'use client'

import { truncateText } from "@/utils/util";
import { PiUserCircleThin } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaFaceGrinStars } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
    currentUser: string
}


const SideBar: React.FC<Props> = ({ currentUser }) => {
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState('purchase');
    const handleButtonClick = (page: string) => {
        // router.push(`/user/${page}`);
        setSelectedPage(page)
    };

    return (
        <div className="flex flex-col items-center w-[25%] text-slate-700">
            <div className="flex flex-row items-center border-b py-2">
                <PiUserCircleThin size={50} />
                <div className="flex flex-col items-start">
                    {truncateText(currentUser, 14)}
                    <button className="flex flex-row items-center ">
                        <CiEdit size={20} />
                        Sửa hồ sơ
                    </button>
                </div>
            </div>

            <button className={`
                ${selectedPage === 'account' ? 'bg-teal-700 text-white' : null}
                flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
                onClick={() => handleButtonClick('account')}
            >

                <div className="relative flex flex-row items-center w-[80%] h-full order">
                    <div className="absolute  top-[6px] left-[2px]">
                        <FaUser size={21} />
                    </div>
                    <p className="absolute top-[6px] left-[30px] text-lg ">
                        Thông tin tài khoản
                    </p>
                </div>

            </button>

            <button className={`
                ${selectedPage === 'notification' ? 'bg-teal-700 text-white' : null}
                flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
                onClick={() => handleButtonClick('notification')}
            >

                <div className="relative flex flex-row items-center w-[80%] h-full order">
                    <div className="absolute  top-[6px]">
                        <IoMdNotifications size={25} />
                    </div>
                    <p className="absolute top-[6px] left-[30px] text-lg ">
                        Thông báo của tôi
                    </p>
                </div>

            </button>
            <button className={`
                ${selectedPage === 'purchase' ? 'bg-teal-700 text-white' : null}
            flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
                onClick={() => handleButtonClick('purchase')}
            >

                <div className="relative flex flex-row items-center w-[80%] h-full order">
                    <div className="absolute  top-[6px]">
                        <RiShoppingBagFill size={23} />
                    </div>
                    <p className="absolute top-[6px] left-[30px] text-lg ">
                        Quản lý đơn hàng
                    </p>
                </div>

            </button>

            <button className={`
                ${selectedPage === 'review' ? 'bg-teal-700 text-white' : null}
            flex flex-row items-center justify-center gap-1 w-full h-[40px]`}
                onClick={() => handleButtonClick('review')}
            >

                <div className="relative flex flex-row items-center w-[80%] h-full order">
                    <div className="absolute  top-[7px]">
                        <FaFaceGrinStars size={20} />
                    </div>
                    <p className="absolute top-[6px] left-[30px] text-lg ">
                        Đánh giá của tôi
                    </p>
                </div>

            </button>



            {/* <button>Thông báo của tôi</button>
            <button>Quản lý đơn hàng</button>
            <button>Đánh giá sản phẩm</button>
            // <button>Nhận xét của tôi</button> */}
        </div>
    )
}

export default SideBar
