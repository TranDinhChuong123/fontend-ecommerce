'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

import Image from "next/image";

import ImageBanner from '../../public/banner-image.png';

const HomeBanner = () => {
    return (
        <div className="relative mb-8">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 3000 }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                loop
                className="mx-auto px-8 py-12 h-[300px]"
            >
                {/* Slide 1 với gradient từ xanh dương */}
                <SwiperSlide>
                    <div className="flex flex-col items-center md:flex-row justify-center gap-8 py-10 bg-gradient-to-r from-sky-500 to-sky-700">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                Khuyến Mãi Mùa Hè!
                            </h1>
                            <p className="text-lg md:text-xl text-white mb-2">
                                Thưởng thức ưu đãi trên các mặt hàng được chọn
                            </p>
                            <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
                                GIẢM NGAY 50%
                            </p>
                        </div>
                        <div className="w-1/3 relative aspect-video">
                            <Image
                                fill
                                className="object-contain"
                                src={ImageBanner}
                                alt="Hình ảnh banner 1"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 với gradient từ đỏ */}
                <SwiperSlide>
                    <div className="flex flex-col items-center md:flex-row justify-center gap-8 py-10 bg-gradient-to-r from-red-500 to-red-700">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                Ưu Đãi Mùa Đông!
                            </h1>
                            <p className="text-lg md:text-xl text-white mb-2">
                                Giữ ấm với những ưu đãi tuyệt vời
                            </p>
                            <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
                                GIẢM ĐẾN 70%
                            </p>
                        </div>
                        <div className="w-1/3 relative aspect-video">
                            <Image
                                fill
                                className="object-contain"
                                src={ImageBanner}
                                alt="Hình ảnh banner 2"
                            />
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 với gradient từ tím */}
                <SwiperSlide>
                    <div className="flex flex-col items-center md:flex-row justify-center gap-8 py-10 bg-gradient-to-r from-purple-500 to-purple-700">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                Ưu Đãi Độc Quyền!
                            </h1>
                            <p className="text-lg md:text-xl text-white mb-2">
                                Đừng bỏ lỡ những ưu đãi tốt nhất của chúng tôi
                            </p>
                            <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
                                THỜI GIAN CÓ HẠN
                            </p>
                        </div>
                        <div className="w-1/3 relative aspect-video">
                            <Image
                                fill
                                className="object-contain"
                                src={ImageBanner}
                                alt="Hình ảnh banner 3"
                            />
                        </div>
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </SwiperSlide>
            </Swiper>
        </div>
    );  
};

export default HomeBanner;