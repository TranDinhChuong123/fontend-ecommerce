// 'use client'

// import { useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Legend, PieChart } from "recharts";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";




// const OrderStatusChart = () => {
//     const [orderStats, setOrderStats] = useState<any | null>(null);

//     return (
//         <div className="w-full h-[300px] bg-white p-8">
//             <h2 className="text-xl font-bold">Trạng thái đơn hàng</h2>
//             <PieChart width={400} height={250}>
//                 <Pie data={orderStats} dataKey="value" nameKey="name" />
//                 <Tooltip />
//                 <Legend />
//             </PieChart>
//         </div>
//     );
// };