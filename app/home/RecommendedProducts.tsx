'use client'

import RenderIf from "@/utils/RenderIf";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProductCard from "../components/products/ProductCard";
import PromoBanner from "./PromoBanner";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const RecommendedProducts = () => {
    const [recommendedProductsData, setRecommendedProductsData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            const token = session?.user?.accessToken;
            if (token) {
                try {
                    const response = await fetch(`${apiUrl}/recommendation/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setRecommendedProductsData(data?.data || []);
                } catch (error) {
                    console.error('Error fetching recommended products:', error);
                    setRecommendedProductsData([]);
                }
            }
        };

        fetchData();
    }, []);
    return (
        <RenderIf isTrue={recommendedProductsData.length > 0}>

            <div className="flex flex-col items-center py-5 gap-4">
                <p className='font-bold text-xl'> GỢI Ý SẢN PHẨM CHO BẠN</p>
                <hr className="w-[50%]" />
                <p>Khám phá những sản phẩm mà bạn có thể quan tâm</p>

            </div>

            <div className="grid grid-cols-2 
        sm:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
                {recommendedProductsData.map((product: any) => (
                    <ProductCard key={product?.id} product={product} />
                ))}
            </div>
            <PromoBanner color="bg-orange-300" label="Ưu đãi khủng 50% cho đơn hàng đầu tiên! " />
        </RenderIf>
    )
}

export default RecommendedProducts
