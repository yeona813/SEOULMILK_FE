interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
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
    setCurrentPage(Math.max(currentPage - 5, 1));
  };

  const jumpForward = () => {
    setCurrentPage(Math.min(currentPage + 5, totalPage));
  };

  return (
    <div className="fixed bottom-0 left-[240px] w-[calc(100%-240px)] gap-2 center py-2 px-[30px] border-t border-t-grayScale-200 bg-white">
      {totalPage > 5 && (
        <button onClick={jumpBackward} disabled={currentPage === 1}>
          <img src="/assets/icons/doubleLeftArrow.svg" alt="doubleLeftArrow" />
        </button>
      )}
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
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
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPage))}
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
