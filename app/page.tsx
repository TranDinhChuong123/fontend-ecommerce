import { fetchProductsWithFiltersAPI } from "@/services/productService";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import NavBar from "./components/nav/NavBar";
import Categories from "./components/nav/Categories";

interface HomePageProps {
  searchParams: { category?: string };
}

export default async function Home({ searchParams }: HomePageProps) {

  const { category } = searchParams;

  const products = await fetchProductsWithFiltersAPI();



  return (
    <div>
      <NavBar />
      <Categories />
      <div className="p-8">

        <Container>

          <HomeBanner />

          <div className="grid grid-cols-2 
            sm:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          ">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
