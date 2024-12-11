import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ stats }: { stats: any }) {
  const labels = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Doanh Thu',
        data: stats
          ? [
            stats.mondaySales,
            stats.tuesdaySales,
            stats.wednesdaySales,
            stats.thursdaySales,
            stats.fridaySales,
            stats.saturdaySales,
            stats.sundaySales,
          ]
          : [0, 0, 0, 0, 0, 0, 0], // Nếu không có dữ liệu, sử dụng mảng giá trị bằng 0
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 10000, // Đặt khoảng cách giữa các ticks là 10,000
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Doanh Thu từ Thứ Hai đến Chủ Nhật trong Tuần Hiện Tại',
      },
    },
  };

  return <Bar data={data} options={options} />;
}
