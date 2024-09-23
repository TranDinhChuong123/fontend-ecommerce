// Helper function to calculate the discounted price
export const calculateDiscountedPrice = (price: number, discount_percent: number) => {
    const discountedPrice = price * (1 - (discount_percent / 100));
    return discountedPrice;
};

export const truncateText = (str: string, stringLength: number = 20) => {
    if (str.length <= stringLength) {
        return str;
    }
    return str.substring(0, stringLength) + '...';
}

export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
}

export const formatDiscountPercent = (discountPercent: number) => {
    return - discountPercent + '%';
}

export const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

import toast from "react-hot-toast";

let currentToastId: string | null = null; // Biến để lưu ID của toast hiện tại


export const showToastError = (message: string) => {
    if (currentToastId) {
        toast.dismiss(currentToastId); // Xóa toast trước đó nếu có
    }
    currentToastId = toast.error(message); // Hiển thị toast mới và lưu ID
};




export const showToastSuccess = (message: string) => {
    if (currentToastId) {
        toast.dismiss(currentToastId); // Xóa toast trước đó nếu có
    }
    currentToastId = toast.success(message); // Hiển thị toast mới và lưu ID
};




