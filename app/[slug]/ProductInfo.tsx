'use client'

import Button from "@/app/components/Button";
import RenderIf from "@/utils/RenderIf";
import { useState } from "react";
import ListRating from "./ListRating";
import { products } from "@/utils/products";

interface ProductInfoProps {
    description: string;
    reviews: any;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ description, reviews }) => {
    const [activeTab, setActiveTab] = useState<'comments' | 'description'>('comments');
    return (
        <div className="flex flex-col mt-10 gap-4 w-full border-2 rounded-lg">
            <div className="mx-10 rounded-lg p-10">
                <div className="flex gap-4 items-center justify-start w-1/3 pb-10 ">
                    <button
                        onClick={() => setActiveTab('comments')}
                        className={`
                            border-slate-500 py-2 px-5 rounded-full 
                            ${activeTab === 'comments' ? 'bg-blue-500 text-white' : ' border'}
                            `}
                    >
                        Đánh giá sản phẩm
                    </button>
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`
                            border-slate-500 py-2 px-5 rounded-full 
                            ${activeTab === 'description' ? 'bg-blue-500 text-white' : ' border'}
                            `}
                    >
                        Mô tả
                    </button>
                </div>

                <RenderIf isTrue={activeTab === 'comments'}>
                    <ListRating ratings={reviews} />
                </RenderIf>
                <RenderIf isTrue={activeTab === 'description'}>
                    <div >
                        {description}
                    </div>
                </RenderIf>

            </div>
        </div>
    )
}

export default ProductInfo
