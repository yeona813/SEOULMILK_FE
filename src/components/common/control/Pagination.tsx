import { useState } from "react";

interface PaginationProps {
  totalPage: number;
}

const Pagination = ({ totalPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const visiblePageCount = 5;

  let startPage, endPage;

  if (currentPage <= 3) {
    startPage = 1;
    endPage = Math.min(visiblePageCount, totalPage);
  } else if (currentPage >= totalPage - 2) {
    startPage = Math.max(totalPage - 4, 1);
    endPage = totalPage;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const jumpBackward = () => {
    setCurrentPage((prev) => Math.max(prev - 5, 1));
  };

  const jumpForward = () => {
    setCurrentPage((prev) => Math.min(prev + 5, totalPage));
  };

  return (
    <div className="flex gap-2">
      {totalPage > 5 && (
        <button onClick={jumpBackward} disabled={currentPage === 1}>
          <img src="/assets/icons/doubleLeftArrow.svg" alt="doubleLeftArrow" />
        </button>
      )}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <img src="/assets/icons/leftArrow.svg" alt="leftArrow" />
      </button>
      {pages.map((page) => (
        <div
          key={page}
          className={`w-8 h-8 rounded-md b4 center border ${
            currentPage === page
              ? "text-secondary-300 border-secondary-300"
              : "text-grayScale-900 hover:bg-grayScale-100 border-white hover:border-grayScale-100"
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </div>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
        disabled={currentPage === totalPage}
      >
        <img src="/assets/icons/rightArrow.svg" alt="rightArrow" />
      </button>
      {totalPage > 5 && (
        <button onClick={jumpForward} disabled={currentPage === totalPage}>
          <img
            src="/assets/icons/doubleRightArrow.svg"
            alt="doubleRightArrow"
          />
        </button>
      )}
    </div>
  );
};

export default Pagination;
