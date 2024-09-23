// import ProductDetails from "./ProductDetails";
// import { products } from "@/utils/products";
// import type { GetStaticPaths, GetStaticProps } from 'next';


// // Giả sử bạn có một API hoặc một danh sách sản phẩm
// export const getStaticPaths: GetStaticPaths = async () => {
//     // Lấy danh sách các sản phẩm từ API
//     const res = await fetch('https://api.example.com/products');
//     const products = await res.json();

//     // Tạo danh sách các đường dẫn với tham số productId
//     const paths = products.map((product: { id: string }) => ({
//         params: { productId: product.id },
//     }));

//     return {
//         paths,
//         fallback: true, // Hoặc 'blocking', tùy thuộc vào cách bạn muốn xử lý các trang không có sẵn
//     };
// };

// export const getStaticProps: GetStaticProps<ProductPageProps> = async (context) => {
//     const { productId } = context.params as { productId: string };

//     // Lấy dữ liệu sản phẩm từ API dựa trên productId
//     const res = await fetch(`https://api.example.com/products/${productId}`);
//     // const product = await res.json();
//     const product = products.find((p) => p.id === productId);
//     if (!product) {
//         return {
//             notFound: true, // Trả về trang 404 nếu sản phẩm không tồn tại
//         };
//     }

//     return {
//         props: { product },
//     };
// };




// interface ProductPageProps {
//     product: any;
// }


// const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
//     return (
//         <div className="p-8">
//             <ProductDetails product={product} />
//         </div>
//     )
// }

// export default ProductPage



// app/product/[productId]/page.tsx




import { products } from "@/utils/products"; // Giả sử bạn có hàm hoặc API để lấy dữ liệu
import ProductDetails from "./ProductDetails";

interface ProductPageProps {
    params: {
        productId: string;
    };
}

// Function to generate static params
// export async function generateStaticParams() {
//     // Giả sử bạn có một API hoặc dữ liệu mẫu để lấy tất cả các productId
//     const productIds = products.map(product => ({ productId: product.id }));

//     return productIds.map(productId => ({
//         params: {
//             productId,
//         },
//     }));
// }

// Component để render dữ liệu
export default async function ProductPage({ params }: ProductPageProps) {
    // Thay vì getStaticProps, sử dụng fetch hoặc truy cập dữ liệu trực tiếp
    const product = products.find((p) => p.id === params.productId) || null;

    return (
        <div className="px-8 pb-8 pt-3">
            {product ? (
                <ProductDetails product={product} />
            ) : (
                <div>Product not found</div>
            )}
        </div>
    );
}

