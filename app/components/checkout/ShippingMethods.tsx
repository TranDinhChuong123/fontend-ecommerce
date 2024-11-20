import React from "react";

interface ShippingMethodsProps {
  selectedShippingMethod: string;
  onSelectShippingMethod: (method: string) => void;
}

const ShippingMethods: React.FC<ShippingMethodsProps> = ({
  selectedShippingMethod,
  onSelectShippingMethod,
}) => {
  const methods = [
    { label: "Nhanh", price: 30000, value: "FAST" },
    { label: "Hỏa Tốc", price: 50000, value: "EXPRESS" },
    { label: "Tiết Kiệm", price: 15000, value: "ECONOMY" },
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium text-gray-700 mb-3">
        Chọn phương thức vận chuyển
      </h3>
      <div className="flex flex-col gap-2">
        {methods.map((method) => (
          <button
            key={method.value}
            onClick={() => onSelectShippingMethod(method.value)}
            className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
              selectedShippingMethod === method.value
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-300"
            }`}
          >
            <span className="text-gray-700">{method.label}</span>
            <span className="text-gray-700 font-medium">
              ₫{method.price.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShippingMethods;
