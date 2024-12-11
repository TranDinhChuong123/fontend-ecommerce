// src/components/common/ExportToExcel.tsx
import * as XLSX from 'xlsx';

interface ExportToExcelProps {
    data: any[]; // Dữ liệu cần xuất
    fileName: string; // Tên file Excel xuất ra
}

const ExportToExcel = ({ data, fileName }: ExportToExcelProps) => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);  // Chuyển đổi mảng sản phẩm thành sheet
        const wb = XLSX.utils.book_new();  // Tạo một workbook mới
        XLSX.utils.book_append_sheet(wb, ws, 'fileName');  // Thêm sheet vào workbook
        XLSX.writeFile(wb, `${fileName}.xlsx`);  // Tạo file Excel và tải về
    };

    return (
        <button
            onClick={exportToExcel}
            className="bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-500 transition"
        >
            Xuất Excel
        </button>
    );
};

export default ExportToExcel;
