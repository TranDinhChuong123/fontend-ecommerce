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

export type ProductAddToCart = {
    productId: string,
    selectedVariationId: string,
    buyQuantity: number
}

export type CartRequest = {
    userId: string,
    productCart: ProductAddToCart
}

export type CartRemoveRequest = {
    userId: string,
    productCartIds: string[]
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


