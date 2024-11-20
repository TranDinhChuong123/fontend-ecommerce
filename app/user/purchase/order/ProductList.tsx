import ItemOrder from "../ItemOrder";

const ProductList = ({
  products,
  status,
}: {
  products: any[];
  status: string;
}) => {
  return (
    <div className="border rounded-xl shadow-sm bg-white px-8 py-4">
      {products?.map((product) => (
        <ItemOrder
          completed={status === "COMPLETED"}
          item={product}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default ProductList;
