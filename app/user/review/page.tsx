'use client'

import ListRating from "@/app/[slug]/ListRating"
import useAxiosAuth from "@/hooks/useAxiosAuth"
import handleApiCall from "@/services/handleApiCall"
import RenderIf from "@/utils/RenderIf"
import { useEffect, useState } from "react"
import { MdOutlineFeedback } from "react-icons/md";
const UserReviewPage = () => {
    const [reviews, setReviews] = useState([])
    const axios = useAxiosAuth()

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await handleApiCall(axios.get('/review/userId'))
                setReviews(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchReviews()
    }, [])
    console.log('reviews', reviews);


    return (
        <div className="bg-slate-50 h-full w-full">
            <div className="flex flex-col justify-center items-start  px-4">
                <RenderIf isTrue={reviews.length > 0}>
                    <p className="text-2xl font-bold mt-5">Danh sách đánh giá sản phẩm </p>
                    <hr />
                    <ListRating ratings={reviews} />
                </RenderIf>

                <RenderIf isTrue={reviews.length === 0}>
                    <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl text-slate-700">
                        <MdOutlineFeedback size={50} />
                        <p className="font-semibold">Chưa có đánh giá nào</p>
                    </div>

                </RenderIf>
            </div >
        </div >
    )
}

export default UserReviewPage
