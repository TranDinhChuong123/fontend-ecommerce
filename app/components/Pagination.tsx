import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded disabled:opacity-50"
      >
        <GrPrevious />
      </button>
      <span className="text-sm font-medium">
         {currentPage} 
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded disabled:opacity-50"
      >
       <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
