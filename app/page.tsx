import { fetchProductsWithFiltersAPI } from "@/services/productService";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import NavBar from "./components/nav/NavBar";
import Categories from "./components/nav/Categories";
import { Pagination } from "@mui/material";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import RenderIf from "@/utils/RenderIf";
import Footer from "./components/footer/Footer";
import decodeToken from "@/utils/decodeToken";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default async function Home() {

  const session = await getServerSession(authOptions)
  const token = session?.user?.accessToken;
  const products = await fetchProductsWithFiltersAPI();
  console.log("products", products);
  
  
  const fetchRecommendedProducts = async () => {
    try{
      const response = await fetch(`${apiUrl}/recommendation/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      console.log("data", data);
      
      return data?.data || [];
    }catch (error) {
      console.error('Error fetching recommended products:', error);
      return [];
    }

  };
  const recommendedProductsData = session?.user?.accessToken
    ? await fetchRecommendedProducts()
    : [];

    console.log("recommendedProductsData", recommendedProductsData);
    


  return (
    <div>
      <NavBar isPageHome />
      <Categories />
      <div className="p-8">

        <Container>

          <HomeBanner />
          <RenderIf isTrue={recommendedProductsData.length > 0}>

            <div className="flex flex-col items-center py-5 gap-4">
              <p className='font-bold text-xl'> GỢI Ý SẢN PHẨM CHO BẠN</p>
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
          </RenderIf>



          <div className="flex flex-col items-center py-5 gap-4 mt-10">
            <p className='font-bold text-xl'>SẢN PHẨM HÔM NAY</p>
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
            {products.map((product: any) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-[20px]">
            <Link className="text-white bg-slate-400 px-[150px] py-2" href='/daily_discover?page=2'>
              Xem thêm
            </Link>
          </div>

        </Container>


      </div>
      <Footer />
    </div>
  );
}



// import { fetchProductsWithFiltersAPI } from "@/services/productService";
// import HomeClient from "./home/HomeClient";

// export default async function Home() {

//   const products = await fetchProductsWithFiltersAPI();

//   return (
//     <>
//       <HomeClient  />
//     </>
//   );
// }



// 'use client'

// import { fetchProductsWithFiltersAPI } from "@/services/productService";
// import Container from "./components/Container";
// import HomeBanner from "./components/HomeBanner";
// import ProductCard from "./components/products/ProductCard";
// import NavBar from "./components/nav/NavBar";
// import Categories from "./components/nav/Categories";
// import { useEffect, useState } from "react";
// import handleApiCall from "@/services/handleApiCall";
// import publicAxios from "@/services/axios/publicAxios";

// export default function Home() {


//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await fetchProductsWithFiltersAPI(currentPage);
//         console.log("data", data); // Kiểm tra log dữ liệu từ API
//         setProducts(data);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       }
//     };

//     fetchProducts();
//   }, [currentPage]);


//   console.log("products", products);
//   console.log("cmmmmmmmmmmmmmmmmmmmmmmmmmmmm");



//   return (
//     <div>
//       <NavBar />
//       <Categories />
//       <div className="p-8">

//         <Container>

//           <HomeBanner />

//           <div className="grid grid-cols-2 
//             sm:grid-cols-3 
//             lg:grid-cols-4
//             xl:grid-cols-5
//             2xl:grid-cols-6
//             gap-8
//           ">
//             {products.map((product: any) => (
//               <ProductCard key={product?.id} product={product} />
//             ))}
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// }

