'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '../components/products/ProductCard';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
interface Props {
    products: any[];  // Danh sách sản phẩm
}

const ProducCarousel: React.FC<Props> = ({ products }) => {
    return (
        <Swiper 
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3000 }}
            spaceBetween={10}  // Khoảng cách giữa các slide
            slidesPerView={5}  // Số lượng sản phẩm hiển thị trên mỗi trang
            slidesPerGroup={5} // Di chuyển 5 sản phẩm mỗi lần
            loop={true}         // Lặp lại carousel
            grabCursor={true}  // Hiển thị con trỏ "kéo" khi người dùng di chuột vào

            direction='horizontal'  // Đảm bảo carousel di chuyển theo chiều ngang
            speed={1000}  // Điều chỉnh tốc độ di chuyển, ở đây là 1 giây (1000 ms)
        >
            {products.map((product: any) => (
                <SwiperSlide key={product.id}>
                    <ProductCard key={product?.id} product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProducCarousel;
