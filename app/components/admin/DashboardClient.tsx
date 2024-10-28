'use client'

import StatsCard from "./StatsCard"
import { MdOutlinePayment } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { PiMoney } from "react-icons/pi";

import dynamic from 'next/dynamic';
import { useState } from "react";
const BarChart = dynamic(() => import('@/app/components/admin/BarChart'), { ssr: false });

type Stats = {
  totalViews: number;
  totalProfit: number;
  totalProducts: number;
  totalUsers: number;
};


const DashboardClient = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = async () => {

  }

  return (
    <div className="min-h-screen w-full">
      <div className="w-full h-[80px] bg-white">
        Bảng điều khiển
      </div>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-row gap-2 items-center justify-between w-full h-[60px] bg-white p-8">
          <StatsCard title="Đơn hàng" value={1000} icon={MdOutlinePayment} />
          <StatsCard title="Khách hàng" value={300} icon={FaUser} />
          <StatsCard title="Doanh thu" value={1000} icon={PiMoney} />
          <StatsCard title="Sản Phẩm" value={1000} icon={FaProductHunt} />
        </div>

        <div>
          <div className="w-[800px] h-[400px]">
            {/* Truyền dữ liệu stats vào biểu đồ */}
            <BarChart stats={{
              mondaySales: 12000,
              tuesdaySales: 15000,
              wednesdaySales: 8000,
              thursdaySales: 20000,
              fridaySales: 25000,
              saturdaySales: 30000,
              sundaySales: 18000,
            }} />

          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardClient
