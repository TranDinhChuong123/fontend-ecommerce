'use client';

import { useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import StatsCard from "./StatsCard";
import RevenueChatsYear from "./RevenueChartYear";
import OrderStatusPieChart from "./OrderStatusPieChart";
import { MdOutlinePayment } from "react-icons/md";
import { FaUser, FaProductHunt } from "react-icons/fa";
import { PiMoney } from "react-icons/pi";
import { formatToMillions } from "@/utils/util";
import RevenueChartDay from "./RevenueChartDay";
import RevenueChartDayInMonth from "./RevenueChartDay";

const AdminDashboard = () => {
  const [selectedYearChartY, setSelectedYearChartY] = useState("2024");
  const [selectedYearChartD, setSelectedYearChartD] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString());
  const { stats, revenueByYear, totalOrderByStatus, revenueByMonth } = useDashboardData(
    selectedYearChartY,
    selectedYearChartD,
    selectedMonth
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const initializeFullYearData = () => {
    const months = Array.from({ length: 12 }, (_, index) => ({
      month: `Tháng ${index + 1}`,
      totalRevenue: 0,
    }));

    revenueByYear.forEach((item: any) => {
      const monthIndex = parseInt(item.month) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        months[monthIndex].totalRevenue = item.totalRevenue;
      }
    });

    return months;
  };

  const chartData = initializeFullYearData();

  const initializeFullMonthData = () => {
    const daysInMonth = Array.from({ length: 31 }, (_, index) => index + 1);
    const monthData = daysInMonth.map(day => {
      const existingData = revenueByMonth.find((item: any) => item.day === day.toString());
      return {
        day,
        totalRevenue: existingData ? existingData.totalRevenue : 0,
      };
    });
    return monthData;
  };

  const chartDataDay = initializeFullMonthData();

  const orderStatusChartData = [
    { name: "Chờ xử lý", value: totalOrderByStatus?.totalOrderPending || 0 },
    { name: "Đã hoàn thành", value: totalOrderByStatus?.totalOrderCompleted || 0 },
    { name: "Đã hủy", value: totalOrderByStatus?.totalOrderCanceled || 0 },
    { name: "Đã xác nhận", value: totalOrderByStatus?.totalOrderConfirmed || 0 },
    { name: "Đang giao", value: totalOrderByStatus?.totalOrderShipping || 0 },
  ];

  return (
    <div className="admin-dashboard px-5">
      <div className="flex flex-col gap-5 items-center">
        <div className="flex flex-row gap-2 items-center justify-between w-full h-[190px] bg-slate-100 px-8 rounded-lg shadow-lg">
          <StatsCard title=" Đơn hàng" value={stats?.totalOrder || 0} icon={MdOutlinePayment} />
          <StatsCard title=" Khách hàng" value={stats?.totalCustomer || 0} icon={FaUser} />
          <StatsCard title=" Doanh thu" value={formatToMillions(stats?.totalRevenue || 0) || 0} icon={PiMoney} />
          <StatsCard title=" Sản phẩm" value={stats?.totalProduct || 0} icon={FaProductHunt} />
        </div>
        <RevenueChartDayInMonth
          chartData={chartDataDay}
          year={selectedYearChartD}
          month={selectedMonth}
          setYear={setSelectedYearChartD}
          setMonth={setSelectedMonth}
        />
        <RevenueChatsYear chartData={chartData} year={selectedYearChartY} setYear={setSelectedYearChartY} />
        <OrderStatusPieChart orderStatusData={orderStatusChartData} colors={COLORS} />
      </div>
    </div>
  );
};

export default AdminDashboard;


