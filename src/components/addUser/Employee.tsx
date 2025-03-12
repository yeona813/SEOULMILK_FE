import EmployeeDownloadXlsx from "./EmployeeDownloadXlsx";
import EmployeeUpload from "./EmployeeUploader";

const Employee = () => {
  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="h1 text-grayScale-900 mb-[10px]">사원</h1>
      <div className="flex items-end gap-2">
        <EmployeeDownloadXlsx />
        <EmployeeUpload />
        <button className="px-[18px] py-2 rounded-lg bg-secondary-500 text-white b3 hover:bg-secondary-700">
          신규등록
        </button>
      </div>
      <div className="flex justify-center text-center pt-[168px] bg-white border-gray-200 rounded-xl h-full b2 text-gray-500">
        사원은 등록 즉시 계정이 활성화됩니다. <br />
        사용자 목록 페이지를 확인해주세요!
      </div>
    </div>
  );
};

export default Employee;
