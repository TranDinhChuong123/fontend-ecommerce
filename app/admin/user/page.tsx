
'use client';

import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import RenderIf from "@/utils/RenderIf";
import { showToastSuccess } from "@/utils/util";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false); // Trạng thái hiển thị form
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const axios = useAxiosAuth();
    const fetchUsers = async () => {
        try {
            const response = await handleApiCall(axios.get('/user/all'));
            console.log('response', response);
            setUsers(response?.data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataUser = {
                name: newUser.name,
                username: newUser.email,
                password: newUser.password,
                email: newUser.email,
                role: newUser.role,
            };
            console.log("dataUser", dataUser);
            const response = await handleApiCall(axios.post('/auth/register', dataUser));

            if (response.data) {
                fetchUsers();
                setIsFormOpen(false);
                showToastSuccess('Tạo người dùng thành công');
            } else {
                showToastSuccess('Email đã tồn tại');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const columns = [
        { field: 'name', headerName: 'Họ và tên', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 2 },
        { field: 'password', headerName: 'Mật khẩu', flex: 1 },
        { field: 'role', headerName: 'Vai trò', flex: 1 },
        { field: 'image', headerName: 'Ảnh đại diện', flex: 1 },
        { field: 'wallet', headerName: 'Ví điện tử', flex: 1 },
        { field: 'authProvider', headerName: 'Xác thực', flex: 1 },
        { field: 'createdAt', headerName: 'Ngày tạo', flex: 1 },
    ];

    return (
        <div className="h-min-screen w-full flex justify-center bg-gray-100 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-4xl h-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-700">
                        {isFormOpen ? 'Thêm người dùng' : 'Danh sách người dùng'}
                    </h2>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => setIsFormOpen((prev) => !prev)}
                    >
                        {isFormOpen ? 'Trở về' : 'Thêm người dùng'}
                    </button>
                </div>

                {/* Form tạo người dùng mới */}
                <RenderIf isTrue={isFormOpen}>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-md">
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-600">Họ và tên:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newUser.name}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-600">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-600">Mật khẩu:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mb-20">
                                <label className="block text-sm font-medium text-gray-600">Vai trò:</label>
                                <select
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleInputChange}
                                    className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="" disabled>Chọn vai trò</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="CUSTOMER">Customer</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-10 py-2 rounded-md hover:bg-green-600 transition"
                                >
                                    Tạo mới
                                </button>
                            </div>
                        </form>
                    </div>
                </RenderIf>

                {/* DataGrid hiển thị danh sách người dùng */}
                <RenderIf isTrue={!isFormOpen}>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <DataGrid
                            getRowId={(row: any) => row?.email}
                            columns={columns}
                            rows={users}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                            disableRowSelectionOnClick
                            sx={{
                                boxShadow: 2,
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#f3f4f6',
                                    fontWeight: 'bold',
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid #e5e7eb',
                                },
                            }}
                        />
                    </div>
                </RenderIf>
            </div>
        </div>
    );
};

export default UserManagementPage;


