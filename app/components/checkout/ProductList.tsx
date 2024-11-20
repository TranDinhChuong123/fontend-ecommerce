
import ItemProduct from '@/app/checkout/ItemProduct';
import { ProductCart } from '@/types/ProductTypes';

interface ProductListProps {
    products: ProductCart[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
    <div className="bg-white rounded-md px-8 py-4 shadow-md">
        {products.map((product) => (
            <ItemProduct key={product.id} item={product} />
        ))}
    </div>
);

export default ProductList;
