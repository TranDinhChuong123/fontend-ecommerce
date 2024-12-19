'use client'

import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChartSimple } from "react-icons/fa6";
import { IoBagCheckOutline, IoChevronDown, IoChevronUp, IoHomeOutline, IoLogOut } from "react-icons/io5";
import { LiaBoxOpenSolid, LiaProductHunt } from "react-icons/lia";
import { PiFolderUser, PiUserSquare } from "react-icons/pi";
const AdminSideBar = () => {
    const pathname = usePathname() || '/';
    const lastPathSegment = pathname.split('/').pop() || 'dashboard';
    const router = useRouter();
    const [isOpenMangePropducts, setIsOpenMangePropducts] = useState(false);
    const [isOpenMangeInventory, setIsOpenMangeInventory] = useState(false);
    const [isOpenMangeStatistical, setIsOpenMangeStatistical] = useState(false);
    const [selectedSidebarItem, setSelectedSidebarItem] = useState(lastPathSegment);
    const [selectedItemDropDown, setSelectedItemDropDown] = useState('');
    const toggleDropdownMProducts = () => {
        setSelectedSidebarItem('ManageProduct');
        setIsOpenMangePropducts(!isOpenMangePropducts);
        setIsOpenMangeInventory(false);
        setIsOpenMangeStatistical(false);
    };

    const toggleDropdownMInventory = () => {
        setSelectedSidebarItem('ManageInventory');
        setIsOpenMangeInventory(!isOpenMangeInventory);
        setIsOpenMangePropducts(false);
        setIsOpenMangeStatistical(false);
    };

    const toggleDropdownStatistical = () => {
        setSelectedSidebarItem('ManageStatistical');
        setIsOpenMangeStatistical(!isOpenMangeStatistical);
        setIsOpenMangePropducts(false);
        setIsOpenMangeInventory(false);

    };
    useEffect(() => {
        if (selectedSidebarItem !== 'ManageProduct') {
            setIsOpenMangePropducts(false);
            setSelectedItemDropDown('')
        }
        if (lastPathSegment === 'add-product') {
            setIsOpenMangePropducts(true)
            setSelectedItemDropDown('add-product')
            setSelectedSidebarItem('ManageProduct')
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

                    onClick={toggleDropdownMProducts}
                >
                    <div className="flex items-center gap-1">
                        <LiaProductHunt className="mr-2" size={25} />
                        <span>Quản lý sản phẩm</span>
                    </div>

                    {isOpenMangePropducts ? <IoChevronUp size={17} /> : <IoChevronDown size={17} />}


                </button>
                {isOpenMangePropducts && (
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
                            onClick={() => handleItemDropDownClick("add-variant")}
                            className={`${selectedItemDropDown === 'add-variant' ? 'text-blue-500 ' : ''} block py-1`}
                        >
                            Thêm Biến Thể Mới
                        </button>


                        <button
                            onClick={() => handleItemDropDownClick("list-product")}
                            className={`${selectedItemDropDown === 'list-product' ? 'text-blue-500' : ''} block py-1`}
                        >
                            Danh sách sản phẩm
                        </button>



                    </div>
                )}
            </div>

            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'ManageInventory' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}

                    onClick={toggleDropdownMInventory}
                >
                    <div className="flex items-center gap-1">
                        <LiaBoxOpenSolid className="mr-2" size={25} />
                        <span>Quản lý kho hàng</span>
                    </div>

                    {isOpenMangePropducts ? <IoChevronUp size={17} /> : <IoChevronDown size={17} />}


                </button>
                {isOpenMangeInventory && (
                    <div
                        className=" text-[#8b9ab0] bg-slate-200 w-full flex flex-col gap-1 items-start pl-14"
                    >
                        <button
                            onClick={() => handleItemDropDownClick("inventory")}
                            className={`${selectedItemDropDown === 'inventory' ? 'text-blue-500' : ''} block py-1`}
                        >
                            Hàng đã mở bán
                        </button>

                        <button
                            onClick={() => handleItemDropDownClick("product-stored")}
                            className={`${selectedItemDropDown === 'product-stored' ? 'text-blue-500' : ''} block py-1`}
                        >
                            Hàng chưa mở bán
                        </button>



                        <button
                            onClick={() => handleItemDropDownClick("product-draft")}
                            className={`${selectedItemDropDown === 'product-draft' ? 'text-blue-500' : ''} block py-1`}
                        >
                            Hàng chưa nhập kho
                        </button>



                    </div>
                )}
            </div>
            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'supplier' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}
                    onClick={() => handleItemClick('supplier')}
                >
                    <div className="flex items-center gap-1">
                        <PiFolderUser className="mr-2" size={25} />
                        <span>Quản lý nhà cung cấp</span>
                    </div>
                </button>

            </div>

            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'user' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}
                    onClick={() => handleItemClick('user')}
                >
                    <div className="flex items-center gap-1">
                        <PiUserSquare className="mr-2" size={25} />
                        <span>Quản lý người dùng</span>
                    </div>
                </button>

            </div>

            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'manage-orders' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}
                    onClick={() => handleItemClick('manage-orders')}
                >
                    <div className="flex items-center gap-1">
                        <IoBagCheckOutline className="mr-2" size={25} />
                        <span>Quản lý đơn hàng</span>
                    </div>
                </button>

            </div>

            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'manage-category' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}
                    onClick={() => handleItemClick('manage-category')}
                >
                    <div className="flex items-center gap-1">
                        <PiFolderUser className="mr-2" size={25} />
                        <span>Quản lý danh mục</span>
                    </div>
                </button>

            </div>

            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'ManageStatistical' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}

                    onClick={toggleDropdownStatistical}
                >
                    <div className="flex items-center gap-1">
                        <LiaBoxOpenSolid className="mr-2" size={25} />
                        <span>Thống kê</span>
                    </div>

                    {isOpenMangeStatistical ? <IoChevronUp size={17} /> : <IoChevronDown size={17} />}


                </button>
                {isOpenMangeStatistical && (
                    <div
                        className=" text-[#8b9ab0] bg-slate-200 w-full flex flex-col gap-1 items-start pl-14"
                    >
                        <button
                            onClick={() => handleItemDropDownClick("product-top-selling")}
                            className={`${selectedItemDropDown === 'product-top-selling' ? 'text-blue-500' : ''} block py-1`}
                        >
                            Sản Phẩm bán chạy
                        </button>

                        <button
                            onClick={() => handleItemDropDownClick("revenue-profit")}
                            className={`${selectedItemDropDown === 'revenue-profit' ? 'text-blue-500' : ''} block py-1`}
                        >
                            Doanh thu và lợi nhuận
                        </button>




                    </div>
                )}
            </div>

            <div className="w-full">
                <button
                    className={`${selectedSidebarItem === 'logout' ? 'bg-[#425270] text-white' : null} flex items-center justify-between w-full px-5 py-2 rounded-sm`}
                    onClick={() => {
                        signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/auth/login` });
                    }}
                >
                    <div className="flex items-center gap-1">
                        <IoLogOut className="mr-2" size={25} />
                        <span>Đăng xuất</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default AdminSideBar
