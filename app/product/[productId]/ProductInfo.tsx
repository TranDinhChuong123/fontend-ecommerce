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
        <div className="flex flex-col mt-5 gap-4 w-full">
            <div className="mx-10 rounded-lg p-10">
                <div className="flex gap-4 items-center justify-start w-1/3 pb-10 ">
                    <Button
                        label="Bình luận"
                        onClick={() => setActiveTab('comments')}
                        outline
                        rounded
                        custom={activeTab === 'comments' ? 'bg-gray-700 text-white' : ''}

                    />
                    <Button
                        label="Mô tả"
                        onClick={() => setActiveTab('description')}
                        outline
                        rounded
                        custom={activeTab === 'description' ? 'bg-gray-700 text-white' : ''}

                    />
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
