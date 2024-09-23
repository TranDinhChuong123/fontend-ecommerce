import { fetchProductsWithFiltersAPI } from "@/services/productService";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";

export default async function Home() {

  const products = await fetchProductsWithFiltersAPI();
  console.log("products:", products);

  return (
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
  );
}
