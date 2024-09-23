'use client'

import { Rating } from "@mui/material";

import moment from "moment";
import Avatar from "@/app/components/Avatar";
import Heading from "../components/Heading";

interface ListRatingProps {
    ratings: any;

}

const ListRating: React.FC<ListRatingProps> = ({ ratings }) => {

    return (
        <div>
            <Heading title="Product Review" />
            <div className="text-sm mt-2">
                {ratings && ratings.map((rating: any) => (
                    <div className="max-w-300px" key={rating.id}>
                        <div className="flex gap-2 items-center">
                            <Avatar src={rating?.user.image} />
                            <div className="font-semibold">{rating?.user.name}</div>
                            <div className="font-light">{moment(rating.createDate).fromNow()}</div>
                        </div>

                        <div className="mt-2">
                            <Rating value={rating.rating} readOnly />
                            <div className="ml-2">{rating.comment}</div>

                            <hr className="mt-4 mb-4" />

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListRating
