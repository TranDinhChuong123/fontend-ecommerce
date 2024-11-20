'use client'

import useAxiosAuth from '@/hooks/useAxiosAuth';
import handleApiCall from '@/services/handleApiCall';
import RenderIf from '@/utils/RenderIf';
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import Input from '../../inputs/Input';
import { FieldPathValues, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../Button';
import { showToastSuccess } from '@/utils/util';

const ProductsDraft = () => {
    const [products, setProducts] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [dataSearch, setDataSearch] = useState('')
    const axios = useAxiosAuth();
    const router = useRouter();
    const [openForm, setOpenForm] = useState(false);
    const [productAdd, setProductAdd] = useState<any>(null)
    const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
    const [openTableSupplier, setOpenTableSupplier] = useState(false);

    const fetchSuppliers = async () => {
        const res = await handleApiCall(axios.get('/supplier'));

        setSuppliers(res?.data || []);
    }
    const fetchProducts = async () => {
        const res = await handleApiCall(axios.get('/product/drafts'));
        console.log("res", res);
        
        setProducts(res?.data || []);
    }

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, [])


    const columns = [
        {
            field: 'action',
            headerName: 'Nhập hàng',
            width: 100,
            renderCell: (params: any) => (
                <button
                    color="primary"
                    onClick={() => {
                        setOpenForm(true)
                        setProductAdd(params.row)
                    }}
                >
                    <CiEdit size={20} />
                </button>
            ),
        },
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 400 },
        { field: 'price', headerName: 'Giá', width: 150 },
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'brand', headerName: 'Brand', width: 200 },
        { field: 'variationId', headerName: 'Id Biến thể', width: 100, editable: true },


    ]

    const columnsSupplier = [
        {
            field: 'action',
            headerName: 'Chọn',
            width: 100,
            renderCell: (params: any) => (
                <button
                    color="primary"
                    onClick={() => {
                        setOpenTableSupplier(false)
                        setSelectedSupplier(params.row)
                    }}
                >
                    <CiEdit size={20} />
                </button>
            ),
        },
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Tên nhà cung cấp', flex: 1 },
        { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 1 },
        { field: 'address', headerName: 'Địa chỉ', flex: 1 },
    ]

    const filterProducts = async () => {
        const res = await handleApiCall(axios.post('/product', { limit: 100, productFilter: { name: dataSearch, category: dataSearch, brand: dataSearch } }));
        setProducts(res?.data || []);
    }
    const data = products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.productVariations[0].price,
        category: product.category,
        brand: product.brand,
        variationId: product.productVariations[0].id,
    }));

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            'add-price': '',
            'quantity': '',
            'cost': '',

        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const inventory = {
            productId: productAdd.id,
            variationId: productAdd.variationId,

            totalQuantityIn: data.quantity,
            quantityInStock: data.quantity,
            totalQuantitySold: 0,
            totalCost: data.cost,
            supplierId: selectedSupplier.id,
            entries: [
                {
                    cost: data.cost,
                    quantity: data.quantity,
                }
            ],
        }
        const res = await handleApiCall(axios.post(`/inventory/new`, inventory));
        console.log("res", res);
        if(res && res.status === 200){
            showToastSuccess("Nhập hàng thành công");
        }
        setOpenForm(false)
        fetchProducts();
    }


    return (


        <div className="flex flex-col items-center justify-center gap-4">

            <div className='bg-white'>

            </div>
            <div className="h-[95%] w-[96%] bg-white p-5" >
                <div className='flex flex-row items-center justify-between mb-10'>
                    <h1 className="text-2xl font-bold hover:cursor-pointer hover:opacity-95"
                        onClick={() => fetchProducts()}
                    >Sản phẩm Mẫu </h1>



                    <div className=' flex flex-row items-center gap-1 border rounded-full pl-2'>
                        <CiSearch size={24} />
                        <input
                            type="text"
                            className='focus:outline-none w-[300px] rounded-full px-4 py-2'
                            onChange={(e) => setDataSearch(e.target.value)}
                        />
                        <button
                            className='bg-teal-700 text-white px-3 py-2 rounded-r-full font-light'
                            onClick={() => filterProducts()}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                <DataGrid
                    columns={columns}
                    rows={data}
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

                <RenderIf isTrue={products.length === 0}>
                    <div className='flex flex-col items-center justify-center gap-4 my-5'>
                        <h1 className="text-xl font-bold">Không tìm thấy sản phẩm</h1>
                    </div>
                </RenderIf>

                <RenderIf isTrue={openForm}>
                    <div className='flex justify-center p-5'>
                        <p className='text-2xl font-bold'>Form nhập hàng</p>
                    </div>
                    <div className='flex flex-col gap-4 px-20 py-10'>
                        <Input
                            id='productID'
                            label='ID Sản phẩm'
                            register={register}
                            errors={errors}
                            value={productAdd?.id}
                            disabled
                        />
                        <Input
                            id='variationId'
                            label='ID Biến thể'
                            register={register}
                            errors={errors}
                            value={productAdd?.variationId || ''}
                            disabled
                        />
                        <Input
                            id='name'
                            label='Tên sản phẩm'
                            register={register}
                            errors={errors}
                            value={productAdd?.name}
                            disabled
                        />

                        <Input
                            id='quantity'
                            label='Số lượng nhập'
                            register={register}
                            errors={errors}
                        />
                        <Input
                            id='cost'
                            label='Chi phí nhập hàng'
                            register={register}
                            errors={errors}
                        />
                        <div className='flex flex-row gap-2'>
                            <Input
                                id='supplier'
                                label='Nhà cung cấp'
                                register={register}
                                errors={errors}
                                value={selectedSupplier?.name}
                                disabled
                            />

                            <div className='w-[40%]'>
                                <Button
                                    label='Chọn nhà cung cấp'
                                    onClick={() => setOpenTableSupplier(true)}

                                />
                            </div>
                        </div>
                        <Button label='Nhập hàng' onClick={handleSubmit(onSubmit)} />
                    </div>

                    <RenderIf isTrue={openTableSupplier}>
                        <div>
                            <div className='flex justify-center p-5'>
                                <p className='text-2xl font-bold'>Danh sách nhà cung cấp</p>
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
                    </RenderIf>
                </RenderIf>


            </div>

        </div>
    )
}

export default ProductsDraft
