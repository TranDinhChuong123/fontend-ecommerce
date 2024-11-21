import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { fetchProductsWithFiltersAPI, fetchProductsWithTotalSoldAPI } from "@/services/productService";
import RenderIf from "@/utils/RenderIf";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Container from "./components/Container";
import Footer from "./components/footer/Footer";
import HomeBanner from "./components/HomeBanner";
import Categories from "./components/nav/Categories";
import NavBar from "./components/nav/NavBar";
import ProductCard from "./components/products/ProductCard";
import ProducCarousel from "./home/ProductCarousel";
import PromoBanner from "./home/PromoBanner";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default async function Home() {

  const session = await getServerSession(authOptions)
  const token = session?.user?.accessToken;
  const products = await fetchProductsWithFiltersAPI();
  const productsDIscount = await fetchProductsWithTotalSoldAPI(3);


  const fetchRecommendedProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/recommendation/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return data?.data || [];
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      return [];
    }

  };
  const recommendedProductsData = session?.user?.accessToken
    ? await fetchRecommendedProducts()
    : [];




  return (
    <div>
      <NavBar isPageHome />
      <Categories />
      <div className="p-8">

        <Container>

          <HomeBanner />

          <RenderIf isTrue={productsDIscount.length > 0}>


            <div className="flex flex-col items-center py-5 gap-4">
              <p className='font-bold text-xl text-slate-600'> SẢN PHẨM NỔI BẬT</p>
              <hr className="w-[50%]" />
              <p className="text-gray-500">Khám phá những sản phẩm mà bạn có thể quan tâm</p>

            </div>
            <ProducCarousel products={productsDIscount} />
          </RenderIf>
          <PromoBanner />
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
