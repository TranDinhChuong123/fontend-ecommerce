'use client'

import useAxiosAuth from "@/hooks/useAxiosAuth"
import handleApiCall from "@/services/handleApiCall"
import { DataGrid } from "@mui/x-data-grid"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import RenderIf from "@/utils/RenderIf"
import SupplierForm from "@/app/components/admin/supplier/SupplierForm"
import BackDrop from "@/app/components/nav/BackDrop"


const SupplierManagementPage = () => {
    const [suppliers, setSuppliers] = useState([])
    const [isOpenForm, setOpenForm] = useState(false);
    const [isFormSuccess, setFormSuccess] = useState(false);

    const toggleForm = () => {
        setOpenForm(prev => !prev);
    }

    const axios = useAxiosAuth();
    const router = useRouter();

    const fetchSuppliers = async () => {
        const res = await handleApiCall(axios.get('/supplier'));

        setSuppliers(res?.data || []);
    }

    useEffect(() => {
        fetchSuppliers();
    }, [isFormSuccess])

    const columnsSupplier = [
        // {
        //     field: 'action',
        //     headerName: 'Chọn',
        //     width: 100,
        //     renderCell: (params: any) => (
        //         <button
        //             color="primary"
        //             onClick={() => {
        //                 setOpenTableSupplier(false)

        //             }}
        //         >
        //             <CiEdit size={20} />
        //         </button>
        //     ),
        // },
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Tên nhà cung cấp', flex: 1 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 1 },
        { field: 'address', headerName: 'Địa chỉ', flex: 1 },
    ]

    return (
        <div className="h-full w-full flex justify-center">
            <div className="bg-white p-5 w-[95%] h-full">
                <div className='flex justify-center p-5'>
                    <p className='text-2xl font-bold'>Danh sách nhà cung cấp</p>
                </div>
                <div className="w-[300px] my-5">
                    <button className="border px-4 py-2 rounded-md" onClick={toggleForm}>
                        Thêm nhà cung cấp
                    </button>
                </div>
                <DataGrid
                    columns={columnsSupplier}
                    rows={suppliers}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </div>
            <RenderIf isTrue={isOpenForm}>
                <SupplierForm setIsFormSuccess={setFormSuccess} onClose={toggleForm} />
                <BackDrop onClick={toggleForm} />
            </RenderIf>
        </div>
    )
}

export default SupplierManagementPage
