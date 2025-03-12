import * as XLSX from "xlsx";

const EmployeeDownloadXlsx = () => {
  const handleDownloadExcel = () => {
    // 헤더만 포함된 빈 데이터 생성
    const worksheet = XLSX.utils.json_to_sheet([], {
      header: ["이름", "사번", "이메일"],
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "사원 목록");

    // Excel 파일 생성 및 다운로드
    XLSX.writeFile(workbook, "사원_목록.xlsx");
  };

  return (
    <button
      onClick={handleDownloadExcel}
      className="gap-1 px-2 center text-grayScale-600 b4 rounded-2xl hover:bg-grayScale-100 h-[30px]"
    >
      <img src="/assets/icons/download.svg" alt="download" />
      사원 등록용 엑셀 파일
    </button>
  );
};

export default EmployeeDownloadXlsx;
