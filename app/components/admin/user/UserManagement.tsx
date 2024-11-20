'use client'

import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import RenderIf from "@/utils/RenderIf";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SupplierForm from "../supplier/SupplierForm";
import BackDrop from "../../nav/BackDrop";

const UserManagement = () => {

    const [users, setUsers] = useState([]);
    const axios = useAxiosAuth();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await handleApiCall(axios.get('/user/all'));
                console.log('response', response);
                setUsers(response?.data || []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);
    console.log("users", users);

    const columns = [
        { field: 'name', headerName: 'Họ và tên', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'role', headerName: 'Role', flex: 1 },
    ]

    const dataRows = users.map((user: any) => ({
        name: user.name,
        email: user.email,
        role: user.role,
    }));

    return (
        <div className="h-full w-full flex justify-center">
            <div className="bg-white p-5 w-[95%] h-full">
                <div className='flex justify-center p-5'>
                    <p className='text-2xl font-bold'>Danh sách nhà cung cấp</p>
                </div>
                <div className="w-[300px] my-5">
                    {/* <button className="border px-4 py-2 rounded-md" onClick={toggleForm}>
                        Thêm nhà cung cấp
                    </button> */}
                </div>
                <DataGrid
                    getRowId={(row) => row.email}
                    columns={columns}
                    rows={dataRows}
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

        </div>
    )
}

export default UserManagement
