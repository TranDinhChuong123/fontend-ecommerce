'use client'

import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import { truncateText } from "@/utils/util";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFaceGrinStars } from "react-icons/fa6";
import { PiUserCircleThin } from "react-icons/pi";
import { RiMapPin2Line, RiShoppingBagFill } from "react-icons/ri";
import Avatar from "../components/common/Avatar";
import useProfile from "@/hooks/useProfile";
import { MdAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
const SideBar: React.FC = () => {
    const pathname = usePathname() || '/';
    const lastPathSegment = pathname.split('/').pop() || 'purchase';
    const { profile } = useProfile();
    const { data: session } = useSession();
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState(lastPathSegment);

    const handleButtonClick = (page: string) => {
        router.push(`/user/${page}`);
        setSelectedPage(page);
    };

    const menuItems = [
        // { label: 'Thông báo của tôi', icon: <IoMdNotifications size={25} />, page: 'notification' },
        { label: 'Hồ sơ cá nhân', icon: <VscAccount size={22} />, page: 'profile' },
        { label: 'Quản lý đơn hàng', icon: <RiShoppingBagFill size={23} />, page: 'purchase' },
        { label: 'Địa chỉ nhận hàng', icon: <RiMapPin2Line size={21} />, page: 'address' },
        { label: 'Đánh giá sản phẩm', icon: <FaFaceGrinStars size={20} />, page: 'review' },
        { label: 'Đổi mật khẩu', icon: <RiLockPasswordLine size={25} />, page: 'reset-password' },
    ];

    return (
        <div className="flex flex-col items-center w-[22%] text-slate-700 border min-h-screen">
            <div className="flex flex-row items-center border-b py-2 gap-2">
                {profile?.image ? (
                    <Avatar src={profile?.image} />
                ) : (
                    <PiUserCircleThin size={50} />

                )}
                <div className="flex flex-col items-start">
                    {truncateText(profile?.name || '', 14)}
                </div>
            </div>

            {menuItems.map(({ label, icon, page }) => (
                <button
                    key={page}
                    className={`${selectedPage === page ? 'bg-teal-700 text-white' : ''
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

