'use client'

import { Rating } from "@mui/material";

import Avatar from "@/app/components/common/Avatar";
import Image from "next/image";
import { getFormattedDate } from "@/utils/util";
import RenderIf from "@/utils/RenderIf";
interface ListRatingProps {
    ratings: any;

}

const ListRating: React.FC<ListRatingProps> = ({ ratings }) => {

    return (
        <div>
            <div className="text-sm mt-2">
                {ratings && ratings.map((rating: any, index: number) => (
                    <div className="max-w-300px py-4" key={rating.username || index}>
                        <div className={`flex gap-2 items-start bg-white p-4 ${!!!rating?.productImage ? "" : "rounded-lg shadow-lg"}`}>
                            <div className="pt-2">
                                <Avatar src={rating?.urlImage} />
                            </div>
                            <div className="flex flex-row gap-10">
                                <div className="flex flex-col gap-1 text-slate-800">
                                    <div className="font-semibold">{rating?.username}</div>
                                    <div className="font-light">{getFormattedDate(rating?.createdAt)}</div>

                                    <div className="flex flex-row items-center gap-2 py-4 w-[300px]">
                                        <Rating value={rating.rating} readOnly />
                                        <div>|</div>
                                        <div>{rating?.color} ,</div>
                                        <div>{rating?.size}</div>
                                        <div>{rating?.capacity}</div>
                                    </div>
                                    <div className="">{rating.comment}</div>

                                    <div className="flex flex-row gap-1">

                                        {rating.imageUrls.map((imageUrl: string, index: number) => (
                                            <div id="img" key={index} className="w-[100px] h-[100px]">
                                                <Image className="object-cover w-[100px] h-[100px] " src={imageUrl} alt="image" width="100" height="100" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <RenderIf isTrue={!!rating?.productImage}>
                                    <div className="border-l-[5px] border-[1px] border-l-red-500 flex flex-col justify-start items-start p-4">

                                        <Image className="" src={rating?.productImage} alt="image" width="100" height="100" />
                                        <p>{rating?.productName}</p>

                                    </div>
                                </RenderIf>
                            </div>

                        </div>




                    </div>
                ))}
            </div>
            <hr className="mt-4 mb-4" />
        </div >
    )
}

export default ListRating
