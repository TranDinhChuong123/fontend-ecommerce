
import { fetchProductByIdAPI, fetchProductsWithCategoryAPI } from "@/services/productService";
import ProductDetails from "./ProductDetails";
import getCurrentUser from "@/actions/getCurrentUser";
import toast from "react-hot-toast";
import NavBar from "../components/nav/NavBar";
import ProducCarousel from "../home/ProductCarousel";
import Footer from "../components/footer/Footer";
import RenderIf from "@/utils/RenderIf";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface ProductPageProps {
    searchParams: { spid?: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ searchParams }) => {
    const currentUser = await getCurrentUser();

    if (!searchParams.spid) {
        return <div>Product not found</div>;
    }
    const product = await fetchProductByIdAPI(searchParams.spid, currentUser?.accessToken);


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


    const productCategory = await fetchProductsWithCategoryAPI(product.categorySlug, 1,null)
    if (!product) {
        return <div className="flex justify-center items-center p-8">
            <h1 className="text-3xl">Product not found</h1>
        </div>
    }




    return (
        <div >
            <NavBar />
            <div className="p-8 flex-col gap-4">
                <ProductDetails product={product} currentUser={currentUser} />
                <div className="">

                    <RenderIf isTrue={recommendedProductsData.length > 0}>
                        <div className="flex flex-col items-center py-5 gap-4">
                            <p className='font-bold text-xl'> GỢI Ý SẢN PHẨM CHO BẠN</p>
                            <hr className="w-[50%]" />
                            <p>Khám phá những sản phẩm mà bạn có thể quan tâm</p>

                        </div>
                        <ProducCarousel products={recommendedProductsData} />
                    </RenderIf>

                    <RenderIf isTrue={productCategory.length > 0 && recommendedProductsData .length === 0}>
                        <div className="flex flex-col items-center py-5 gap-4 mt-10">
                            <p className='font-bold text-xl'>SẢN PHẨM TƯƠNG TỰ</p>
                            <hr className="w-[50%]" />
                            <p>Khám phá những sản phẩm mà bạn có thể quan tâm</p>
                        </div>


                        <div>
                            <ProducCarousel products={productCategory} />
                        </div>
                    </RenderIf>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ProductPage


