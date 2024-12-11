'use client';

import { useRouter } from "next/navigation";

export default function AccessDenied() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Chuyển hướng về trang chủ hoặc trang khác
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Truy Cập Bị Từ Chối</h1>
      <p className="text-lg text-gray-700 mb-6">
        Bạn không có quyền truy cập vào trang này.
      </p>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Quay Về Trang Chủ
      </button>
    </div>
  );
}
