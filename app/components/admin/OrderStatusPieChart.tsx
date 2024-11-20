import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type OrderStatusPieChartProps = {
  orderStatusData: { name: string; value: number }[];
  colors: string[];
};

const OrderStatusPieChart = ({ orderStatusData, colors }: OrderStatusPieChartProps) => {
  return (
    <div className="w-full h-[400px] bg-white p-8 border rounded-md shadow-lg">
      <h2 className="text-xl font-bold">Tổng Đơn hàng theo trạng thái</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={orderStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {orderStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatusPieChart;
