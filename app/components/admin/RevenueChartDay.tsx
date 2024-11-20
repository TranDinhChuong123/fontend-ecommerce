import React, { useEffect } from "react";
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
    chartData: { day: number; totalRevenue: number }[];
    year: string;
    month: string;
    setYear: (year: string) => void;
    setMonth: (month: string) => void;
};

const RevenueChartDayInMonth = ({
    chartData,
    year,
    month,
    setYear,
    setMonth,
}: RevenueChartProps) => {
    const years = ["2023", "2024", "2025"];
    const months = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
    ]; 

    return (
        <div className="w-full h-[500px] bg-white p-8 rounded-md shadow-lg mt-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Doanh thu theo ngày trong tháng</h2>
                <div className="flex gap-4">
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

                    {/* Combobox chọn tháng */}
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-4"
                    >
                        {months.map((m) => (
                            <option key={m} value={m}>
                                Tháng {m}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 100, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => formatPrice(value)} />
                    <Tooltip formatter={(value) => formatPrice(Number(value))} />
                    <Bar dataKey="totalRevenue" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChartDayInMonth;
