import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { fetchProductsWithFiltersAPI, fetchProductsWithTotalSoldAPI } from "@/services/productService";
import RenderIf from "@/utils/RenderIf";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Container from "./components/common/Container";
import Footer from "./components/footer/Footer";
import HomeBanner from "./home/HomeBanner";
import Categories from "./components/nav/Categories";
import NavBar from "./components/nav/NavBar";
import ProductCard from "./components/products/ProductCard";
import ProducCarousel from "./home/ProductCarousel";
import PromoBanner from "./home/PromoBanner";
import RecommendedProducts from "./home/RecommendedProducts";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function Home() {

  const session = await getServerSession(authOptions)
  const token = session?.user?.accessToken;
  const products = await fetchProductsWithFiltersAPI();
  const productsDIscount = await fetchProductsWithTotalSoldAPI(3);


  // const fetchRecommendedProducts = async () => {
  //   try {
  //     const response = await fetch(`${apiUrl}/recommendation/user`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await response.json();

  //     return data?.data || [];
  //   } catch (error) {
  //     console.error('Error fetching recommended products:', error);
  //     return [];
  //   }

  // };
  // const recommendedProductsData = session?.user?.accessToken
  //   ? await fetchRecommendedProducts()
  //   : [];

  return (
    <div>
      <NavBar isPageHome />
      <Categories />
      <div className="p-8">

        <Container>

          <HomeBanner />

          <RenderIf isTrue={productsDIscount?.length > 0}>
            <div className="flex flex-col items-center py-5 gap-4">
              <p className='font-bold text-xl text-slate-600'> SẢN PHẨM NỔI BẬT</p>
              <hr className="w-[50%]" />
              <p className="text-gray-500">Khám phá những sản phẩm mà bạn có thể quan tâm</p>

            </div>
            <ProducCarousel products={productsDIscount} />
          </RenderIf>

          <PromoBanner color="bg-sky-300" label=" Săn deal mê ly Ưu đãi khủng " />
          {/* <RenderIf isTrue={recommendedProductsData.length > 0}>

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
            <PromoBanner color="bg-orange-300" label="Ưu đãi khủng 50% cho đơn hàng đầu tiên! " />
          </RenderIf> */}
          <RecommendedProducts />

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
            <RenderIf isTrue={products.length > 0}>
              {products?.map((product: any) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </RenderIf>
          </div>

          <div className="flex justify-center mt-[20px]">
            <Link className="text-white bg-blue-400 px-[150px] py-2 rounded-sm text-base" href='/daily_discover?page=2'>
              Xem thêm
            </Link>
          </div>

        </Container>


      </div>
      <Footer />
    </div>
  );
}

// 'use client'

// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { fetchProductsWithFiltersAPI, fetchProductsWithTotalSoldAPI } from "@/services/productService";
// import RenderIf from "@/utils/RenderIf";
// import { getSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";  // import hooks
// import Container from "./components/common/Container";
// import Footer from "./components/footer/Footer";
// import HomeBanner from "./home/HomeBanner";
// import Categories from "./components/nav/Categories";
// import NavBar from "./components/nav/NavBar";
// import ProductCard from "./components/products/ProductCard";
// import ProducCarousel from "./home/ProductCarousel";
// import PromoBanner from "./home/PromoBanner";
// import LoadingComponent from "./components/common/LoadingComponent";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export default function Home() {
//   const [recommendedProductsData, setRecommendedProductsData] = useState<any[]>([]);  // state for recommended products
//   const [products, setProducts] = useState<any[]>([]);
//   const [productsDIscount, setProductsDiscount] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);  // loading state for fetching data

//   useEffect(() => {
//     const fetchData = async () => {
//       const session = await getSession();
//       const token = session?.user?.accessToken;

//       // Fetch products with filters and total sold products
//       const fetchedProducts = await fetchProductsWithFiltersAPI();
//       setProducts(fetchedProducts);

//       const fetchedProductsDiscount = await fetchProductsWithTotalSoldAPI(3);
//       setProductsDiscount(fetchedProductsDiscount);

//       // Fetch recommended products if token exists
//       if (token) {
//         try {
//           const response = await fetch(`${apiUrl}/recommendation/user`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           const data = await response.json();
//           setRecommendedProductsData(data?.data || []);
//         } catch (error) {
//           console.error('Error fetching recommended products:', error);
//           setRecommendedProductsData([]);
//         }
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, []);


//   if (loading) {
//     return <LoadingComponent />;
//   }
//   console.log(" recommendedProductsData", recommendedProductsData);

//   return (
//     <div>
//       <NavBar isPageHome />
//       <Categories />
//       <div className="p-8">
//         <Container>
//           <HomeBanner />
//           <RenderIf isTrue={productsDIscount.length > 0}>
//             <div className="flex flex-col items-center py-5 gap-4">
//               <p className='font-bold text-xl text-slate-600'> SẢN PHẨM NỔI BẬT</p>
//               <hr className="w-[50%]" />
//               <p className="text-gray-500">Khám phá những sản phẩm mà bạn có thể quan tâm</p>
//             </div>
//             <ProducCarousel products={productsDIscount} />
//           </RenderIf>

//           <PromoBanner color="bg-sky-300" label=" Săn deal mê ly Ưu đãi khủng " />
//           <RenderIf isTrue={recommendedProductsData.length > 0}>
//             <div className="flex flex-col items-center py-5 gap-4">
//               <p className='font-bold text-xl'> GỢI Ý SẢN PHẨM CHO BẠN</p>
//               <hr className="w-[50%]" />
//               <p>Khám phá những sản phẩm mà bạn có thể quan tâm</p>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
//               {recommendedProductsData.map((product: any) => {
//                 if (!product) return null
//                 return <ProductCard key={product?.id} product={product} />
//               })}
//             </div>
//             <PromoBanner color="bg-orange-300" label="Ưu đãi khủng 50% cho đơn hàng đầu tiên! " />
//           </RenderIf>

//           <div className="flex flex-col items-center py-5 gap-4 mt-10">
//             <p className='font-bold text-xl'>SẢN PHẨM HÔM NAY</p>
//             <hr className="w-[50%]" />
//             <p>Khám phá những sản phẩm mà bạn có thể quan tâm</p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
//             <RenderIf isTrue={products.length > 0}>
//               {products.map((product: any) => {
//                 return <ProductCard key={product?.id} product={product} />;
//               })}

//             </RenderIf>
//           </div>

//           <div className="flex justify-center mt-[20px]">
//             <Link className="text-white bg-blue-400 px-[150px] py-2 rounded-sm text-base" href='/daily_discover?page=2'>
//               Xem thêm
//             </Link>
//           </div>

//         </Container>
//       </div>
//       <Footer />
//     </div>
//   );
// }

