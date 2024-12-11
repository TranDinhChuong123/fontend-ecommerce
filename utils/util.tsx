import slugify from "slugify"

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
export const formatToMillions = (value: number): string => {
    if (value < 1000000) {
      return "0 tr"; // Nếu dưới 1 triệu, hiển thị là 0 tr
    }
    const millions = value / 1000000;
    return `${millions.toFixed(1).replace(".", ",")} tr`;
  };
  

export const formatPrice = (amount: any ) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
}

export const formatDiscountPercent = (discountPercent: number) => {
    return - discountPercent + '%';
}

export const Horizontal = () => {
    return <hr className="w-[30%] my-10" />
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

export const createSlug = (label: string) => {
    return slugify(label, { lower: true })
}


export const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
  
    const formattedDate = date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long', // Hiển thị tên tháng
      day: '2-digit', // Hiển thị ngày với 2 chữ số
    });
  
    const formattedTime = date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Định dạng 24 giờ
    });
  
    return `${formattedTime} ${formattedDate}`;
  };
  





