import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type OrderStatusPieChartProps = {
  orderStatusData: { name: string; value: number }[];
  colors: string[];
};

const OrderStatusPieChart = ({ orderStatusData, colors }: OrderStatusPieChartProps) => {
  return (
    <div className="w-full h-[500px] bg-gradient-to-b from-white to-gray-50 p-6 border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tổng Đơn Hàng Theo Trạng Thái</h2>
      <div className="w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="90%" height="90%">
          <PieChart>
            <Pie
              data={orderStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
       
            >
              {orderStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => value}
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              }}
              itemStyle={{ color: '#333' }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              height={36}
              wrapperStyle={{
                marginTop: '16px',
                color: '#444',
                fontSize: '14px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderStatusPieChart;

