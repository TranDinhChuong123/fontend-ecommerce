'use client'
import formatPrice from "@/utils/formatPrice";
import truncateText from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    data: any;
}


const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter();
    const productRating = data.reviews.reduce((acc: number, item: any) =>
        item.rating + acc, 0) / data.reviews.length;

    return (
        // col-span-1: Phần tử sẽ chiếm một cột Các lớp như grid,.
        <div
            onClick={() => router.push(`/product/${data.id}`)}
            className='col-span-1 border-[1.2px] gap-1 p-2 
                text-center rounded-sm text-sm cursor-pointer
                border-slate-200 bg-slate-50 
                transition hover:scale-105  
        '>
            <div className="flex flex-col items-center w-full gap-1">

                {/* Để sử dụng lớp này, chỉ cần thêm overflow-hidden
                 vào lớp của phần tử HTML mà bạn muốn ẩn nội dung tràn ra ngoài: */}

                <div className="w-full relative aspect-square overflow-hidden">
                    <Image fill src={data.images[0].image} alt={data.name} className="w-full h-full object-contain" />
                </div>
                <div className="mt-4 h-9">{truncateText(data.name)}</div>
                <div>
                    <Rating value={productRating} readOnly />
                </div>
                <div className="">{data.reviews.length} reviews</div>
                <div>{formatPrice(data.price)}</div>

            </div>
        </div>
    )
}

export default ProductCard
