import Container from "../components/common/Container"
import CartClient from "./CartClient"
import getCurrentUser from "@/actions/getCurrentUser"
import NavBar from "../components/nav/NavBar"
import Footer from "../components/footer/Footer"
import { fetchProductsWithCategoryAPI } from "@/services/productService"
import RenderIf from "@/utils/RenderIf"
import ProducCarousel from "../home/ProductCarousel"
import ProductCard from "../components/products/ProductCard"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const Cart = async () => {
    const currentUser = await getCurrentUser()
    const fetchRecommendedProducts = async () => {
        try {
            const response = await fetch(`${apiUrl}/recommendation/user`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.accessToken}`,
                },
            });

            const data = await response.json();

            return data?.data || [];
        } catch (error) {
            console.error('Error fetching recommended products:', error);
            return [];
        }

    };
    const recommendedProductsData = currentUser?.accessToken
        ? await fetchRecommendedProducts()
        : [];


    return (
        <div>
            <NavBar label="Giỏ hàng" notIsCart />
            <div className="pt-4">
                <Container>
                    <CartClient currentUser={currentUser} />
                </Container>
            </div>
            {/* <RenderIf isTrue={recommendedProductsData.length > 0}>
                <div className="flex flex-col items-center py-5 gap-4">
                    <p className='font-bold text-xl'>CÓ THỂ BẠN CŨNG THÍCH</p>
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
            </RenderIf> */}

            <Footer />
        </div>

    )
}

export default Cart
