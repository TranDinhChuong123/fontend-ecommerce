'use client'

import { FaChartSimple } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { useEffect, useState } from "react";
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
const AdminSideBar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSidebarItem, setSelectedSidebarItem] = useState('dashboard');
    const [selectedItemDropDown, setSelectedItemDropDown] = useState('');
    const toggleDropdown = () => {
        setSelectedSidebarItem('ManageProduct');
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        if (selectedSidebarItem !== 'ManageProduct') {
            setIsOpen(false);
            setSelectedItemDropDown('')
        }
    }, [selectedSidebarItem]);

    const handleItemClick = (item: string) => {
        router.push(`/admin/${item}`);
        setSelectedSidebarItem(item)
    };

    const handleItemDropDownClick = (item: string) => {
        router.push(`/admin/${item}`);
        setSelectedItemDropDown(item);

    };



    return (
        <div className='h-min-screen w-[23%] bg-white text-gray-700 flex flex-col items-center p-4 gap-2'>
            <div className="flex flex-row items-center gap-2 pl-7">
                <FaChartSimple size={50} />
                <p className='text-3xl font-medium mt-5'>Admin Economart</p>
            </div>
            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'dashboard' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}
                    onClick={() => handleItemClick('dashboard')}
                >
                    <div className="flex items-center gap-1">
                        <IoHomeOutline className="mr-2" size={25} />
                        <span>Bảng điều khiển</span>
                    </div>
                </button>

            </div>

            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'ManageProduct' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}

                    onClick={toggleDropdown}
                >
                    <div className="flex items-center gap-1">
                        <RxDashboard className="mr-2" size={25} />
                        <span>Quản lý sản phẩm</span>
                    </div>

                    {isOpen ? <IoChevronUp size={17} /> : <IoChevronDown size={17} />}


                </button>
                {isOpen && (
                    <div
                        className=" text-[#8b9ab0] bg-slate-200 w-full flex flex-col gap-1 items-start pl-14"
                    >
                        <button
                            onClick={() => handleItemDropDownClick("add-product")} 
                            className={`${selectedItemDropDown === 'add-product' ? 'text-blue-500' : ''} block py-1`}
                        >
                            Thêm sản phẩm
                        </button>

                        <button
                            onClick={() => handleItemDropDownClick("list-product")} 
                            className={`${selectedItemDropDown === 'list-product' ? 'text-blue-500' : ''} block py-1`}
                        >
                            Danh sách sản phẩm 
                        </button>


                        <a href="#" className="py-1">Reports</a>
                        <a href="#" className="py-1">Settings</a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminSideBar
