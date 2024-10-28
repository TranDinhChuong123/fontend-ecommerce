export type ImageType = {
    color: string;
    urlImage: string;
}

export type ProductVariationType = {
    id: string,
    color: string,
    size?: string
    capacity?: string
    price: number,
    discountPercent: number,
    reviews: [],
    soldQuantity: number,
    quantity: number,
}

export type selectedProductType = {
    id: string;
    name: string;
    color: string;
    urlImage: string;
    price_new: number;
    buyQuantity: number;
    warranty?: string, // thoi han bao hanh
    selectedVariation: ProductVariationType;
}



export type DynamicProductType = {
    color: string;
    urlImage: string;
    price_new: number;
    buyQuantity: number;
    selectedVariation: ProductVariationType;
    productVariations: ProductVariationType[]
}

export type CartProduct = {
    productId: string,
    selectedVariationId: string,
    buyQuantity: number
}

export type CartRequest = {
    userId: string,
    cartProduct: CartProduct
}

export type CartRemoveRequest = {
    cartId: string,
    cartProductIds: string[]
}

export type ProductCart = {
    id: string;
    productId: string;
    selectedVariationId: string;
    name: string;
    color: string;
    urlImage: string;
    capacity: string;
    size: string;
    slug: string;
    price: number;
    discountPercent: number;
    quantity: number;
    buyQuantity: number;
    isChecked?: boolean;
};

export type CartType = {
    cartId: string;
    userId: string;
    cartProducts: ProductCart[];
}

export type AddressType = {
    id: string; 
    name: string;
    phoneNumber: string;
    street: string;
    state: boolean;
}

export type OrderProduct = {
    id: string;                     // ID đơn hàng
    name: string;                   // Tên sản phẩm tại thời điểm đặt hàng
    productId: string;              // ID của sản phẩm gốc
    selectedVariationId?: string;   // ID của biến thể sản phẩm (nếu có), có thể là optional (?)
    color?: string;                 // Màu sắc của sản phẩm (nếu có), có thể là optional (?)
    size?: string;                  // Kích thước của sản phẩm (nếu có), có thể là optional (?)
    price: number;                  // Giá của sản phẩm tại thời điểm đặt hàng
    discountPercent: number;        // Phần trăm giảm giá (nếu có)
    buyQuantity: number;            // Số lượng sản phẩm mua
}



