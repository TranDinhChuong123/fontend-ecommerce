'use client'

import LoadingComponent from "@/app/components/common/LoadingComponent";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import handleApiCall from "@/services/handleApiCall";
import RenderIf from "@/utils/RenderIf";
import { formatPrice, showToastSuccess } from "@/utils/util";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IPrams {
    variationId?: string;
}

const ProductVaraitionPage = ({ params }: { params: IPrams }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const axios = useAxiosAuth();
    const [product, setProduct] = useState<any>({});

    const fetchProducts = async () => {
        const res = await handleApiCall(axios.get(`/sku-details/get-product/${params.variationId}`));
        setProduct(res?.data || {});
        setIsLoading(false);
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handlePublish = async () => {
        const res = await handleApiCall(axios.post(`/sku-details/publish/${params.variationId}`));
        if(res){
            showToastSuccess("Xác nhận mở bán thành công");
            window.history.back();
        }
        console.log("res", res);
        fetchProducts();
    };

    if (isLoading) return <LoadingComponent />;

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-10">
            <div className="p-6 bg-white shadow-xl rounded-lg w-full max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => window.history.back()}  
                        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition w-36"
                    >
                        Trở về
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800 text-center w-full">
                        Chi tiết sản phẩm
                    </h1>
                </div>

                {/* Product Information */}
                <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64">
                        {product && (
                            <Image
                                id="image"
                                className="object-cover rounded-lg shadow-md"
                                alt="Product Variation Image"
                                src={product?.urlImage || ""}
                                fill
                            />
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="text-center md:text-left flex flex-col gap-4  w-32 h-32 md:w-48 md:h-48 lg:w-auto lg:h-64">
                        <p className="text-sm text-gray-500 mt-2">
                            Product ID: <span className="font-medium text-gray-700">{product?.id}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            SKU ID: <span className="font-medium text-gray-700">{product?.variationId}</span>
                        </p>
                        <h2 className="text-lg font-semibold text-gray-800">{product?.name}</h2>

                        {/* Product Attributes */}
                        <div className="mt-6 space-y-2">
                            {product?.color && (
                                <p className="text-gray-600">
                                    Màu sắc:{" "}
                                    <span className="font-semibold text-gray-800">{product?.color}</span>
                                </p>
                            )}
                            {product?.size && (
                                <p className="text-gray-600">
                                    Size: <span className="font-semibold text-gray-800">{product?.size}</span>
                                </p>
                            )}
                            {product?.capacity && (
                                <p className="text-gray-600">
                                    Dung lượng:{" "}
                                    <span className="font-semibold text-gray-800">{product?.capacity}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>



                {/* Pricing */}
                <div className="mt-6">
                    <p className="text-lg text-gray-800">
                        Giá bán:{" "}
                        <span className="text-red-500 font-semibold">
                            {formatPrice(product?.price)}
                        </span>
                    </p>
                    {product?.discountPercent >= 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                            Giảm giá:{" "}
                            <span className="text-green-500 font-semibold">
                                {product?.discountPercent || 0}%
                            </span>
                        </p>
                    )}
                </div>

                {/* Stock */}
                <div className="mt-6">
                    <p className="text-gray-600">
                        Số lượng tồn:{" "}
                        <span className="font-semibold text-gray-800">{product?.quantity}</span>
                    </p>
                </div>

                {/* Action Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handlePublish}
                        className="px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition"
                    >
                        Xác nhận mở bán
                    </button>
                </div>
            </div>
        </div>


    )
}

export default ProductVaraitionPage
