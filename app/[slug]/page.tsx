import { fetchProductByIdAPI } from "@/services/productService";
import ProductDetails from "./ProductDetails";
import getCurrentUser from "@/actions/getCurrentUser";
import toast from "react-hot-toast";
import NavBar from "../components/nav/NavBar";

interface ProductPageProps {
    searchParams: { spid?: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ searchParams }) => {
    const currentUser = await getCurrentUser();
    
    if (!searchParams.spid) {
        return <div>Product not found</div>;
    }
    const product = await fetchProductByIdAPI(searchParams.spid, currentUser?.accessToken);

    if (!product) {
        return <div className="flex justify-center items-center p-8">
            <h1 className="text-3xl">Product not found</h1>
        </div>
    }

    return (
        <div >
            <NavBar />
            <div className="p-8">
                <ProductDetails product={product} currentUser={currentUser} />
            </div>
        </div>
    )
}

export default ProductPage


