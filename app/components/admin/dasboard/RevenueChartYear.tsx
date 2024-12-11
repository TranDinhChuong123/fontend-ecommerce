import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatPrice } from "@/utils/util";

type RevenueChartProps = {
  chartData: { month: string; totalRevenue: number }[];
  year: string;
  setYear: (year: string) => void;
};

const RevenueChatsYear = ({ chartData, year, setYear }: RevenueChartProps) => {
  const years = ["2023", "2024", "2025"];

  return (
    <div className="w-full h-[500px] bg-white p-8 rounded-md shadow-lg mt-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Doanh thu theo tháng của năm</h2>
        {/* Combobox chọn năm */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 100, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => formatPrice(value)} />
          <Tooltip formatter={(value) => formatPrice(Number(value))} />
          <Bar dataKey="totalRevenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChatsYear;
